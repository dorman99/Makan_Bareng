var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.set('views', './views')
app.set('view engine', 'ejs')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
const userRouter  = require('./routes/user')
const threadRouter = require('./routes/thread')
app.use('/users',userRouter)
// app.use('/', require('./routes/index'))
app.use('/thread', threadRouter)
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3220,()=>{
    console.log('you are listing to localhost:3000')
})
