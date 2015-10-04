var express     = require('express');
var request     = require('request');
var bodyParser  = require('body-parser');



var app         = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.set('view engine', 'jade');
app.set('views', './views/');



app.get('/searchinit', function(req, res){
  res.render('index-form');
})

app.post('/searching', function(req,res){

  var search = req.body.drug;
  console.log(search);
  //res.send('Searching for ' + search + ' in database...');

  request('https://api.fda.gov/drug/event.json?api_key=CNoTQXXfsG6hmF8EzbvS0Z8OcOiZNEtdmGm2OGZA&search=patient.drug.medicinalproduct:' + search, function(err, resp, body) {

    var json            = JSON.parse(body);
    var searchlength    = json.meta.results.total;

    if(searchlength >= 100){
      searchlength = 20;
    }


    request('https://api.fda.gov/drug/event.json?api_key=CNoTQXXfsG6hmF8EzbvS0Z8OcOiZNEtdmGm2OGZA&limit='+searchlength+'&search=patient.drug.medicinalproduct:' + search, function(err, resp, body) {
      var json = JSON.parse(body);


      var i     = 0;
      var count = 0;
      while(i < searchlength){

        var serious = json.results[i].serious;
        if(serious == 1){
          count++;
        }
        i++;
      };

      res.render('index', { ratio: 100*count/searchlength, drugname: search });


    });
  });

})





app.listen(3000);
console.log("listening");