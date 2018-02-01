const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', function (req, res) {
  Model.Thread.findAll()
  .then(function(data) {
    res.render('thread',{keyThread:data})
  })
  .catch(function(err) {
    res.send(err)
  })
})



router.get('/add', (req, res) => {
    res.render('addThread', { err: null })
});

router.post('/add', (req, res) => {
  // res.send(req.body)

    let objThread={
        judulThread : req.body.judulThread,
        JenisMakananID : req.body.JenisMakananID,
        waktuMulai : req.body.waktuMulai,
        waktuBerakhir : req.body.waktuBerakhir
    }
    // res.send(objThread)
    Model.Thread.create(objThread)
    .then(function(){
        res.redirect('/thread')
            })
    .catch(function(err){
      console.log(err.message)
      res.render('addThread', { err: err })
      })
    })


router.get('/edit/:id', function (req, res) {
    Model.Thread.findOne({ where: { id: req.params.id } })
        .then(function(data) {
            res.render('editThread', {keyThread: data})
        })
        .catch(function(err) {
            res.send(err)
        })
})

router.post('/edit/:id', function (req, res) {
  let objThread={
      judulThread : req.body.judulThread,
      JenisMakananID : req.body.JenisMakananID,
      waktuMulai : req.body.waktuMulai,
      waktuBerakhir : req.body.waktuBerakhir,
      location : req.body.location
  }

    Model.Thread.update(objThread, {
        where: {
            id: req.params.id
        }
    }).then(function(){
        res.redirect('/thread')
    }).catch(function(err){
        res.send(err)
    })
})

router.get('/delete/:id', function (req, res) {
    Model.Thread.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/thread')
    }).catch(err => {
        res.send(err)
    })
})

router.get('/find/:id', function (req, res) {
    // res.send(req.params.id)
    Model.User.findById(req.params.id,{
      include: Model.Thread
    })
    .then(function(data){
        res.render('userView',{data:data.Threads,idUser:req.params.id})
    }).catch(err => {
        res.send(err)
    })
})

router.get('/joinThread/:id', function (req, res) {


  Model.Thread.findAll()
  .then(function(data) {
    res.render('joinThread',{keyThread:data,idUser:req.params.id})
  })
  .catch(function(err) {
    res.send(err)
  })
})


router.get('/join/:id', (req, res) => {
    // console.log('hhhhhhhhhhhhhhhhhhhhhh',req.session.idUser);
    let objId={
        UserId   :req.session.idUser,
        ThreadId :req.params.id,
        role     :'member'
    }

    Model.Makanan.create(objId)
    .then(function() {
      // console.log('---',req.session.idUser)
      Model.User.findById(req.session.idUser,{
        include: Model.Thread
      })
    .then(function(data){
          res.render('userView',{data:data.Threads,idUser:req.params.id
          })

    .catch(function(err) {
        res.send(err)
      })
    })

    .catch(function(err) {
        res.send(err)
    })
  })
})

router.get('/user/add', (req, res) => {
    res.render('userAddThread', { err: null })
});

router.post('/user/add', (req, res) => {
  // res.send(req.body)
    let objThread={
        judulThread : req.body.judulThread,
        JenisMakananID : req.body.JenisMakananID,
        waktuMulai : req.body.waktuMulai,
        waktuBerakhir : req.body.waktuBerakhir,
        location : req.body.location
    }

    Model.Thread.create(objThread)
    .then(function(dataThread){
      // res.send(dataThread)
      let objId={
          UserId   :req.session.idUser,
          ThreadId :dataThread.id,
          role     :'master'
      }
      Model.Makanan.create(objId)
      .then(function(){
        Model.User.findById(req.session.idUser,{
        include: Model.Thread
        }).then(function(data){
          res.redirect(`/thread/find/${req.session.idUser}`)
        }).catch(function(err) {
            res.send(err)
          })
      })
      .catch(function(err) {
        res.send(err)
    })
  }).catch(function(err) {
    res.send(err)
})
})






module.exports = router
