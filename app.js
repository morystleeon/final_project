let express = require('express')
let app = express()
let port = 3000

let models = require('./models/index')
let appRoute = require('./app/routes/index')

app.use(express.json())
app.use('/', appRoute)

app.listen(port, () =>{
    console.log('Example app listen to port 3000')
})