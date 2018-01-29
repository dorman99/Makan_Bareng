const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
app.set('view engine', 'ejs')


app.use('/', require ('./routes/index'))
app.use('/thread', require ('./routes/thread'))



app.listen(3000,()=> console.log('Example app listening on port 3000!'))
