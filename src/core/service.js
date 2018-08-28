var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var cmdSubmitter = require('ap-mysql').cmdSubmitter

var app=express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(bodyParser.json())
app.set('view engine', 'jade')
app.get('/submit',function(req,res){
  res.render('index');
})

app.post('/', function(req, res, next) {
    cmdSubmitter.submit(req.body.sql, function(err, results) {
      if(err) {
        res.send(err)
      } else {        
        res.send(results)
      }
    })
})

app.listen(3000,function(){
    console.log("Sever listening on port 3000")
})
