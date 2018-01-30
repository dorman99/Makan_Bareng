var express = require('express')
var router = express.Router()
const Model = require('../models')
var session = require('express-session')
router.get('/', function (req, res) {
    Model.User.findAll({
        order: [['id', 'ASC']]
    })
        .then(dataUsers => {
            res.render('users', { dataUsers:dataUsers,req:req })
            // res.send(dataUser)
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/add', function (req, res) {
    res.render('addUser', { err: null })
})

router.post('/add', function (req, res) {
    let objCreate = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role : req.body.role
    }
    Model.User.create(objCreate)
        .then(() => {
            res.redirect('/users')
        })
        .catch(err => {
            console.log(err.message)
            res.render('addUser', { err: err })
        })
})

router.get('/edit/:id', function (req, res) {
    Model.User.findOne({ where: { id: req.params.id } })
        .then(dataUser => {
            res.render('editUser', { dataUser: dataUser, err: null })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/edit/:id', function (req, res) {
    let objEdit = {
        id : req.params.id,
        name: req.body.name,
        email: req.body.email,
        role : req.body.role
    }

    Model.User.update(objEdit, {
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/users')
    }).catch(err => {
        Model.User.findOne({ where: { id: req.params.id } })
        .then(dataUser => {
            res.render('editUser', { dataUser: dataUser, err: err })
        })
    })
})

router.get('/delete/:id', function (req, res) {
    Model.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/users')
    }).catch(err => {
        res.send(err)
    })
})


module.exports = router