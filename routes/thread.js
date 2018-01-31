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
      waktuBerakhir : req.body.waktuBerakhir
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
    Model.User.findById(req.params.id,{
      include: Model.Thread
    })
    .then(function(data){
        // res.send(data.Threads)
        res.render('userView',{data:data.Threads})
    }).catch(err => {
        res.send(err)
    })
})

router.get('/joinThread', function (req, res) {
  Model.Thread.findAll()
  .then(function(data) {
    res.render('joinThread',{keyThread:data})
  })
  .catch(function(err) {
    res.send(err)
  })
})

router.post('/join/:id', (req, res) => {
  // res.send(req.body)
    let objId={
        UserId : req.session.id,
        ThreadId : req.body.id,
    }
    // res.send(objThread)
    Model.Makanan.create(objId)
    .then(function() {
        res.redirect('/userView')
            })
    .catch(function(err) {
        res.send(err)
      })
    })




module.exports = router
