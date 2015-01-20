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

var uri;
var getMongoUri = function() {

  // return "mongodb://CloudFoundry_ids0og1r_hlaug1jk_6l8hvfn8:ji2HOfQbTjqXHo-pfEO6St0a_4sPZwp0@ds031601.mongolab.com:31601/CloudFoundry_ids0og1r_hlaug1jk";

  if (!uri)
  {
    var cfenv = require("cfenv");
    var appEnv = cfenv.getAppEnv();
    var services = appEnv.getServices();
    console.log("services:" + JSON.stringify(services));
    var myservice = appEnv.getService("gnavi_mongo");
    var credentials = myservice.credentials;
    console.log("credentials:" + credentials);
    uri = credentials.uri;
  }
  
  return uri;
};

var getGnaviPrefs = function(db) {
  var d = Q.defer();

  db.prefecture.findOne(function(err, prefectureList) {
    if(err || !prefectureList) 
    {
      d.reject(new Error(err));
    }
    else 
    {
      console.log("prefectureList found");
      d.resolve(prefectureList);

    }
  });

  return d.promise;
};

// var getCountGroupByArea = function(db) {
//   var d = Q.defer();


//   db.gnavi.group(
//     {
//       keyf: function(doc) {
//                  return { area_code: doc.code.areacode, area_name: doc.code.areaname };
//              },
//       reduce: function( curr, result ) {
//                  result.count++;
//              },
//       initial: { count: 0 }
//     },
//     function(err, areaCountList) {
//       if(err || !areaCountList) 
//       {
//         console.log("err: " + err);
//         d.reject(new Error(err));
//       }
//       else 
//       {
//         console.log("areaCountList found");
//         console.log(areaCountList);
//         d.resolve(areaCountList);

//       }
//   });

//   return d.promise;
// };

var getGnaviAreas = function(db) {
  var d = Q.defer();

  db.area.findOne(function(err, areaList) {
    if(err || !areaList) 
    {
      d.reject(new Error(err));
    }
    else 
    {
      console.log("areaList found");
      d.resolve(areaList);

    }
  });

  return d.promise;
};

var getCountByArea = function(db, area) {

  var d = Q.defer();

  db.gnavi.count({"code.areacode": area.area_code},function(err, count) {
    if (count == 0)
    {
      d.resolve({area_code: area.area_code , area_name: area.area_name, count: count});
    }
    else if (err || !count)
    {
      console.log(" err:" + err);
      d.reject(new Error(err));      
    }
    else 
    {
      d.resolve({area_code: area.area_code , area_name: area.area_name, count: count});
    }
  });

  return d.promise;
};

var getCountByAreaList = function(db, areaList) {
  var d = Q.defer();

  var prom = [];
  areaList.area.forEach(function (area) {
    prom.push(getCountByArea(db, area));
  });


  Q.all(prom)
    .then(function (areaCountList) {
        d.resolve(areaCountList);
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


app.get('/api/getGnaviPrefs', function (req, res) {
  
  var mongojs = require('mongojs');
  var db = mongojs(getMongoUri(), ["prefecture"]);

  getGnaviPrefs(db)
    .then(function(prefectureList) {
      console.log("prefectureList:");
      console.log(prefectureList);
      res.set('Content-Type', 'application/json');
      res.send(prefectureList);
    })
    .done(function() {
      console.log("db:" + db);
      console.log("getGnaviPrefs mongodb close");
      console.log("db:" + db);
      db.close();
    });

});

// app.get('/api/getCountGroupByArea', function (req, res) {
  
//   var mongojs = require('mongojs');
//   var db = mongojs(getMongoUri(), ["gnavi"]);

//   getCountGroupByArea(db)
//     .then(function(areaCountList) {
//       res.set('Content-Type', 'application/json');
//       res.send(areaCountList);
//     })
//     .done(function() {
//       console.log("mongodb close");
//       db.close();
//     });

// });

app.get('/api/getGnaviAreas', function (req, res) {
  var mongojs = require('mongojs');
  var db = mongojs(getMongoUri(), ["area"]);

  getGnaviAreas(db)
    .then(function(areaList) {
      console.log("areaList:");
      console.log(areaList);
      res.set('Content-Type', 'application/json');
      res.send(areaList);
    })
    .done(function() {
      console.log("mongodb close");
      db.close();
    });
});

app.get('/api/getCountByArea', function (req, res) {
  var mongojs = require('mongojs');
  var db = mongojs(getMongoUri(), ["gnavi","area"]);


  getGnaviAreas(db)
    .then(function(areaList) {
        return getCountByAreaList(db, areaList);
    })
    .then(function(areaCountList) {
      console.log("areaCountList:");
      console.log(areaCountList);
      res.set('Content-Type', 'application/json');
      res.send(areaCountList);
    })
    .catch(console.error)
    .done(function() {
      console.log("getCountByArea mongodb close");
      db.close();
    });
});


/*
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

*/
app.listen(process.env.PORT || 9000);
