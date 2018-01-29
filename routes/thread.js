const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
  Model.Thread.findAll()
  .then(function(data) {
    res.render('thread',{keyThread:data})
  })
  .catch(function(err) {
    res.send(err)
  })
})



router.get('/add', (req, res) => {
    res.render('addThread')
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
    .then(function() {
        res.redirect('/thread')
            })
    .catch(function(err) {
        res.send(err)
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




module.exports = router
