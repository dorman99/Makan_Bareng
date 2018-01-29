var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.set('views', './views')
app.set('view engine', 'ejs')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
const userRouter  = require('./routes/user')
app.use('/users',userRouter)

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000,()=>{
    console.log('you are listing to localhost:3000')
})