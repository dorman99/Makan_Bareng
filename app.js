var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')


const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')
const loginAuth =  require('./helper/authLogin')
const Model = require('./models')
app.use(passport.initialize())
app.use(cookieParser());


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

const googlePlusRouter = require('./routes/googleplus')
const userRouter  = require('./routes/user')
const threadRouter = require('./routes/thread')
const signupRouter = require('./routes/signUp')

app.use('/users',loginAuth.cekLoginAdmin,userRouter)

app.use('/thread',loginAuth.cekLogin, threadRouter)
app.use('/signup',signupRouter)
app.use('/signInGoogle',googlePlusRouter)

app.get('/login',function(req,res){

    res.render('loginWithoutGoogle',{
        err:null
    })
})


app.post('/login', function (req, res) {

    Model.User.findOne({
        where : {
            username : req.body.username.toLowerCase()
        }
    })
    .then(dataUser=>{
        if(dataUser){
            //cek password nanti make becrypte
            if(dataUser.password == req.body.password){
                req.session.isLogin = true
                // res.send(dataUser)
                req.session.idUser = dataUser.id
                req.session.name = dataUser.name
                req.session.email = dataUser.email
                // console.log(dataUser,'---')
                if(dataUser.role =='admin'){
                    res.redirect('/users')
                }else{
                    // console.log('hahah')
                    res.redirect(`/thread/find/${req.session.idUser}`)
                }
            }else{
                res.render('loginWithoutGoogle', {
                    err: 'password yang anda masukan salah'
                })
            }
        }else{
            res.render('loginWithoutGoogle', {
                err: 'username tidak ditemukan , tidak punya akun? silakan sign up'
            })
        }
    })
})

app.get('/logout',function(req,res){ //tinggal make hyper linknya aja di tiap ejs kalo udah masuk
    req.session.destroy(err=>{
        if(!err){
            res.redirect('/login')
        }else{
            res.send(err)
        }
    })
})

app.listen(3000,()=>{ //edit crud user
    console.log('you are listing to localhost:3000')
})
