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
        res.render('addThread', { err: err.errors[0].message })
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
        // res.send(data)
        // console.log(data.Threads.Makanan)
        res.render('userView',{dataThreads:data.Threads,dataUser:data})
    }).catch(err => {
        res.send(err)
    })
})

router.get('/joinThread/:id', function (req, res) {
    Model.User.findOne({
        where :{
            id:req.params.id
        },
        include:[{model:Model.Makanan}]
    }).then(dataUser=>{
       Model.Thread.findAll()
        .then(dataThread=>{
            res.render('joinThread', { dataThread: dataThread, dataUser: dataUser ,err:null})
        })
    })
})


router.get('/join/:id', (req, res) => {
//   let id =  req.session.idUser
    let objAddTread = {
        UserId : req.session.idUser,
        ThreadId : req.params.id
    }
    Model.Thread.findById(req.params.id,{
      include: Model.User
    })
    .then(function(data){
        // res.send(data)
        res.render('MakananCreate',{dataUsers:data.Users,dataUser:data,dataUT:objAddTread,err:null})
    }).catch(err => {
        res.send(err)
    })
  })

router.get('/delete/makanan/:id', function (req, res) {
    Model.Makanan.destroy({
        where: {
            ThreadId:req.params.id,
            UserId  :req.session.idUser
        }
    }).then(() => {
        res.redirect(`/thread/find/${req.session.idUser}`)
    }).catch(err => {
        res.send(err)
    })
})


router.post('/join/:id',(req,res)=>{
    // res.send(req.body)
    let objCreate = {
        ThreadId : req.body.ThreadId,
        UserId   : req.body.UserId,
        role     : 'member',
        namaMakanan:req.body.makanan
    }
    // res.send(objCreate)
    Model.Makanan.create(objCreate)
    .then(()=>{
        res.redirect(`/thread/find/${req.body.UserId}`)
    }).catch(err=>{
        Model.Thread.findById(req.params.id, {
            include: Model.User
        }).then(function (data) {
                // res.send(data)
                res.render('MakananCreate', { dataUsers: data.Users, dataUser: data, dataUT: objCreate, err: err.errors[0].message })
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
          namaMakanan:req.body.namaMakanan,
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
          res.render('userAddThread', { err: err.errors[0].message })
    })
  }).catch(function(err) {
      res.render('userAddThread', { err: err.errors[0].message })
})
})






module.exports = router
