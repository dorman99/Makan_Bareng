const express = require('express'),
    app = express(),
    router = express.Router()
    passport = require('passport'),
    auth = require('../helper/authGplus')
const Model = require('../models')
auth(passport);
;

// router.get('/', (req, res) => {
//     res.json({
//         status: 'session cookie not set'
//     });
// });

router.get('/', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.email']
}));

router.get('/callback',
    passport.authenticate('google'), // complete the authenticate using the google strategy
    (err, req, res, next) => { // custom error handler to catch any errors, such as TokenError
        if (err.name === 'TokenError') {
            res.redirect('/auth/google'); // redirect them back to the login page
        } else {
            res.send(err)
            // Handle other errors here
        }
    },
    (req, res) => { // On success, redirect back to '/'
    // res.send(req.user)
        let objuserGoogle = {
            name : req.user.profile.name.givenName,
            username : req.user.profile.displayName,
            email : req.user.profile.emails[0].value,
            role:'user'
        }
        Model.User.findOne({
            where: {
                email : objuserGoogle.email
            }
        }).then(dataUser=>{
            if(dataUser){
                req.session.isLogin = true
                req.session.idUser = dataUser.id
                res.redirect(`/thread/find/${req.session.idUser}`)
            }else{
                res.render('signUpbyGoogle', { dataNewUser: objuserGoogle,err:null})
            }
        })
    }
);

router.post('/loginbygoogle',(req,res)=>{
    let objUser = {
        name : req.body.name,
        username : req.body.username.toLowerCase(),
        email : req.body.email,
        password:req.body.password,
        role :req.body.role
    }
    Model.User.create(objUser)
    .then((dataUser)=>{
        
        req.session.isLogin = true
        req.session.idUser  = dataUser.id
        res.redirect(`/thread/find/${req.session.idUser}`)
        
       
    }).catch(err=>{
        res.render('signUpbyGoogle', { dataNewUser: objUser  , err:err})
    })
})

module.exports = router
