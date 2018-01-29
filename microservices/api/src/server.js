var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.post('/charge', function (req, res) {

var amount = req.body.amount;
var currency = req.body.currency;
var source = req.body.src;
var description = req.body.description;
var key = process.env.secretkey;
var stripe = require('stripe')(key);
 stripe.charges.create(
{
  amount: amount,
  currency: currency,
  source: source,
  description: description
},function(err,charge){
if(err)
res.send(err);
else
res.send(charge);
}
);

});

app.post('/charge/retrieve', function (req, res) {
 var id = req.body.id;
 var key = process.env.secretkey;
var stripe = require('stripe')(key);
stripe.charges.retrieve(
  id,function(err,charge){
if(err)
res.send(err);
else
res.send(charge);
}
);

});

app.post('/update', function (req, res) {
 var id = req.body.id;
 var key = process.env.secretkey;
var description = req.body.description;

var stripe = require('stripe')(key);
stripe.charges.update(
  id,
  {
    description:description
  },function(err,charge){
if(err)
res.send(err);
else
res.send(charge);
}
);

});

app.post('/capture', function (req, res) {
 var id = req.body.id;
 var key = process.env.secretkey;
var stripe = require('stripe')(key);

stripe.charges.capture(id, function(err,charge){
if(err)
res.send(err);
else
res.send(charge);
}
);

});

app.post('/charges/:limit', function (req, res) {
 var limit=req.params.limit;
 var key = process.env.secretkey;
var stripe = require('stripe')(key);

stripe.charges.list(
  { limit: limit }, function(err,charge){
if(err)
res.send(err);
else
res.send(charge);
}
);

});


app.get('/', function (req, res) {
  res.send('Hello world! Ravikant & Divyanshu');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080');
})
