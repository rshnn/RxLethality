var express = require('express');
var app = express();
var request = require('request');


// Visit localhost:3000/
app.get('/fda', function(req, res) {
  // Pull the search term out of the query argument
  var search = req.query.q;
  
  // Make the giphy api request passing in our search term
  request('https://api.fda.gov/drug/event.json?api_key=CNoTQXXfsG6hmF8EzbvS0Z8OcOiZNEtdmGm2OGZA&search=' + search, function(err, resp, body) {
    // Parse the response body as json
    var json = JSON.parse(body);
    
    res.send(json);
  });
});


app.get('/', function(req, res) {
  // Pull the search term out of the query argument


  // Make the giphy api request passing in our search term
  request('https://api.fda.gov/drug/event.json?api_key=CNoTQXXfsG6hmF8EzbvS0Z8OcOiZNEtdmGm2OGZA&search="death"', function(err, resp, body) {
    // Parse the response body as json
    var json = JSON.parse(body);

    var drug = json.results[1].patient;
    console.log(drug);
    

   	res.send(drug);
  });
});

//log.typeof();
// npm install
// res.render




app.get('/:name', function(req, res) {
  var name = req.params.name;
  res.send('Hello, ' + name);
});


app.listen(3000);