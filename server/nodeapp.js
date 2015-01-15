var application_root = __dirname;
var express = require("express");
var request = require('request');
var path = require("path");
var Q = require("q");
var app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

var getMongoUri = function() {

  // return "mongodb://CloudFoundry_ids0og1r_hlaug1jk_6l8hvfn8:ji2HOfQbTjqXHo-pfEO6St0a_4sPZwp0@ds031601.mongolab.com:31601/CloudFoundry_ids0og1r_hlaug1jk";

  var cfenv = require("cfenv");
  var appEnv = cfenv.getAppEnv();
  var services = appEnv.getServices();
  console.log("services:" + JSON.stringify(services));
  var myservice = appEnv.getService("gnavi_mongo");
  var credentials = myservice.credentials;
  console.log("credentials:" + credentials);
  return credentials.uri;

};

var uri = getMongoUri();

var getGnaviPrefs = function(db) {
  var d = Q.defer();
console.log("getGnaviPrefs");
  db.prefecture.findOne(function(err, prefectureList) {
    if(err || !prefectureList) 
    {
      d.reject(new Error(err));
    }
    else 
    {
      console.log("found");
      d.resolve(prefectureList);

    }
  });

  return d.promise;
};

// Config
app.use(allowCrossDomain);
app.use(express.static(path.join(application_root, "../client")));

app.get('/api', function (req, res) {
   res.send('Ecomm API is running');
   console.log("Hello World");
});


app.get('/getGnaviPrefs', function (req, res) {
  
  var mongojs = require('mongojs');
  var db = mongojs(uri, ["prefecture"]);

  getGnaviPrefs(db)
    .then(function(prefectureList) {
      res.set('Content-Type', 'application/json');
      res.send(prefectureList);
    })
    .done(function() {
      console.log("close");
      db.close();
    });

});

app.get('/getGnaviAreas', function (req, res) {
  var url = "http://api.gnavi.co.jp/ver1/AreaSearchAPI/?keyid=3752190c2d640eb83d502e192085ccf9&format=json";
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      res.set('Content-Type', 'application/json');
      res.send(body);
    }
    else
    {
      console.log(response.statusCode);
      console.log(error);

    }
  })
});

app.get('/getGnaviCats', function (req, res) {
  var url = "http://api.gnavi.co.jp/ver1/CategoryLargeSearchAPI/?keyid=3752190c2d640eb83d502e192085ccf9&format=json";
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      res.set('Content-Type', 'application/json');
      res.send(body);
    }
    else
    {
      console.log(response.statusCode);
      console.log(error);

    }
  })
});

app.get('/getGnaviRestByArea', function (req, res) {
  var url = "http://api.gnavi.co.jp/ver1/RestSearchAPI/?keyid=3752190c2d640eb83d502e192085ccf9&area=" + req.query.area + "&hit_per_page=1&format=json";
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      res.set('Content-Type', 'application/json');
      res.send(body);
    }
    else
    {
      console.log(response.statusCode);
      console.log(error);

    }
  })
});

app.get('/getGnaviRestByCat', function (req, res) {
  var url = "http://api.gnavi.co.jp/ver1/RestSearchAPI/?keyid=3752190c2d640eb83d502e192085ccf9&category_l=" + req.query.category_l + "&hit_per_page=1&format=json";
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      res.set('Content-Type', 'application/json');
      res.send(body);
    }
    else
    {
      console.log(response.statusCode);
      console.log(error);

    }
  })
});

app.get('/getGnaviRestByAreaCat', function (req, res) {
  var url = "http://api.gnavi.co.jp/ver1/RestSearchAPI/?keyid=3752190c2d640eb83d502e192085ccf9&category_l=" + req.query.category_l + "&area=" + req.query.area + "&hit_per_page=1&format=json";
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      res.set('Content-Type', 'application/json');
      res.send(body);
    }
    else
    {
      console.log(response.statusCode);
      console.log(error);

    }
  })
});


app.listen(process.env.PORT || 9000);
