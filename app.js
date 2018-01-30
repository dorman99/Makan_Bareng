var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')

const loginAuth =  require('./helper/authLogin')
const Model = require('./models')
app.use(session({
    secret: 'keychain'
}))

app.get('/',function(req,res){
    res.send('hello dunia')
})

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// const loginWithOutGoogleRouter = require('./routes/loginWithOutGoogleAPI')
const userRouter  = require('./routes/user')
const threadRouter = require('./routes/thread')
const signupRouter = require('./routes/signUp')

app.use('/users',loginAuth,userRouter)
app.use('/thread', threadRouter)
app.use('/signup',signupRouter)
// app.use('/loginWithoutGoogle',loginWithOutGoogleRouter)

app.get('/loginWithoutGoogle',function(req,res){
    res.render('loginWithoutGoogle',{
        err:null
    })
})

app.post('/loginWithoutGoogle', function (req, res) {
    Model.User.findOne({
        where : {
            email : req.body.email.toLowerCase()
        }
    })
    .then(dataUser=>{
        if(dataUser){
            //cek password nanti make becrypte
            if(dataUser.password == req.body.password){
                req.session.isLogin = true
                // res.send(dataUser)
                req.session.name = dataUser.name
                req.session.email = dataUser.email
                // console.log(dataUser,'---')
                if(dataUser.role =='admin'){
                    res.redirect('/users')
                }else{
                    res.redirect('/thread')
                }
            }else{
                res.redirect('/loginWithoutGoogle')
            }
        }else{
            res.redirect('/loginWithoutGoogle')
        }
    })
})

app.get('/logout',loginAuth,function(req,res){ //tinggal make hyper linknya aja di tiap ejs kalo udah masuk
    req.session.destroy(err=>{
        if(!err){
            res.redirect('/loginWithOutGoogle')
        }else{
            res.send(err)
        }
    })
})

app.listen(4000,()=>{ //edit crud user
    console.log('you are listing to localhost:4000')
})
