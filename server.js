var express = require('express');
var mongodb = require('mongodb');
var randomstring = require("randomstring");
var app = express();

// setup view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index.ejs');
})

// using mongodb


//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
//(Focus on This Variable)
var url = 'mongodb://localhost:27017/urls';
//(Focus on This Variable)
// Use connect method to connect to the Server



// setup routes

app.get('/create/:param' , function(req ,res) {
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    //TODO modify port
     var collection = db.collection('urls');
     console.log(req);
     var randomShort = randomstring.generate({length: 6,charset: 'alphabetic'});
     var url = {url : req.params.param , shortUrl :randomShort}
     collection.insert(url, function(err,result){
       if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        res.send({'original':req.params.param , 'shortUrl':getHost(req,randomShort)});
      }
      db.close();
     });
  }
});
});

app.get('/:param' , function(req, res){
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    //TODO modify port
     var collection = db.collection('urls');
     collection.find({shortUrl: req.param.param}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
      //Close connection
      db.close();
    });

  }
});
});

function getHost(req, generatedString){
  return req.protocol + '://' + req.get('host')+'/'+generatedString;
}

/*app.get('/:param', function(req, res) {
      if(isNumeric(req.params.param)){
        var dateNatural = moment.unix(req.params.param).format("MMMM DD ,  YYYY");
        if(moment(dateNatural).isValid()){
          res.send({'unix':req.params.param,'natural':dateNatural});
        }else{
          res.send({'unix':null,'natural':null});
        }
      }else{
        if(moment(req.params.param).isValid()){
          var dateUnix = moment(req.params.param).unix();
          res.send({'unix':dateUnix,'natural':req.params.param});
        }else{
          res.send({'unix':null,'natural':null});
        }
      }
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}*/

var port = 8000;
app.listen(8000, function () {
  console.log('Example app listening on port %s!',port);
})
