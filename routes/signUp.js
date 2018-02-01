const express = require('express')
const router  = express.Router()
const Model   = require('../models')
router.get('/',function(req,res){
    res.render('signup',{err:null})
})


router.post('/',function(req,res){
    let objSignUp ={
        name      : req.body.name,
        email     : req.body.email.toLowerCase(),
        password  : req.body.password,
        username  : req.body.username,
        role      : 'user'
    }

    Model.User.create(objSignUp)
    .then(()=>{
        res.redirect('/loginwithoutgoogle')
    })
    .catch(err=>{
        res.render('signup', { err: err })
    })
})
module.exports = router