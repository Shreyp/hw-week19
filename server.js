var express = require('express');
var bodyparser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var PORT = process.env.PORT || 5678;
var app = express();

//Setup for Morgan
app.use(logger('dev'));

//Setup for public folder
app.use(express.static(__dirname + '/public'));

//Setup for body parser
app.use(bodyparser.json());

//Setup for DB Connection
var db = 'mongodb://localhost/yardsale';
mongoose.connect(db);
var User = require('./models/user.js')
var Item = require('./models/item.js')

//Setup for Routes
app.get('/', function(req, res){
  res.sendFile(process.cwd() + "/public/index.html")
})

app.get('/createUser', function(req,res){
  var newUser = new User(req.body);
  newUser.save(function(err, newUser){
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(newUser);
    }
  });
});

app.post('/login', function(req, res) {
  User.findOne({
    'username': req.body.username
  })
  .exec(function(err, user) {
    if (err) {
      console.log('error');
      res.send(err);
    }else{
      console.log(user);
      res.send(user);
    }
  })
});

app.get('/addItem', function(req, res) {
  console.log(req.body);
  var newItem = new Item(req.body);
  newItem.save(function(err, newItem){
    if (err) {
      console.log(err);
      res.send(err);
    }else {
      res.send(newItem);
    }
  });
});

app.post('/giveMoney/:id', function(req, res){
  console.log(req.body)
  User.findOneAndUpdate({_id: req.params.id}, {wallet: req.body.wallet}, {new: true}, function(err, doc){
    if (err){
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

//Listen
app.listen(PORT, function() {
  console.log("CHECK OUT %s", PORT);
});