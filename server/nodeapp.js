/**************************/
/* config */
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

app.use(allowCrossDomain);
app.use(express.static(path.join(application_root, "../client")));
/* config */
/**************************/




/**************************/
/* get mongodb uri */
var uri;
var getMongoUri = function() {

  return "mongodb://CloudFoundry_ids0og1r_hlaug1jk_6l8hvfn8:ji2HOfQbTjqXHo-pfEO6St0a_4sPZwp0@ds031601.mongolab.com:31601/CloudFoundry_ids0og1r_hlaug1jk";

  // if (!uri)
  // {
  //   var cfenv = require("cfenv");
  //   var appEnv = cfenv.getAppEnv();
  //   var services = appEnv.getServices();
  //   // console.log("services:" + JSON.stringify(services));
  //   var myservice = appEnv.getService("gnavi_mongo");
  //   var credentials = myservice.credentials;
  //   // console.log("credentials:" + credentials);
  //   uri = credentials.uri;
  // }
  
  // return uri;
};
/* get mongodb uri */
/**************************/

/**************************/
/* REST API hello */
app.get('/api', function (req, res) {
   res.send('REST API is running.');
   console.log("REST API is running.");
});
/* REST API hello */
/**************************/


/**************************/
/* REST API getGnaviPrefs */
app.get('/api/getGnaviPrefs', function (req, res) {
  console.log("Begin: /api/getGnaviPrefs");
  var mongojs = require('mongojs');
  var db = mongojs(getMongoUri(), ["prefecture"]);
  
  console.log("Before getting prefectureList: " + (new Date()).toISOString());
  getGnaviPrefs(db)
    .then(function(prefectureList) {
      console.log("After getting prefectureList: " + (new Date()).toISOString());
      console.log("prefectureList:");
      console.log(prefectureList);

      res.set('Content-Type', 'application/json');
      res.send(prefectureList);
    })
    .done(function() {
      console.log("getGnaviPrefs mongodb close");
      db.close();
      console.log("End: /api/getGnaviPrefs");
    });

});

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
/* REST API getGnaviPrefs */
/**************************/


/**************************/
/* REST API getCountByArea */
app.get('/api/getCountByArea', function (req, res) {
  console.log("Begin: /api/getCountByArea");
  var mongojs = require('mongojs');
  var db = mongojs(getMongoUri(), ["gnavi","area"]);

  console.log("Before getting areaList: " + (new Date()).toISOString());
  getGnaviAreas(db)
    .then(function(areaList) {
        console.log("After getting areaList: " + (new Date()).toISOString());
        console.log("areaList:");
        console.log(areaList);
        console.log("Before getting areaCountList: " + (new Date()).toISOString());

        return getCountByAreaList(db, areaList);
    })
    .then(function(areaCountList) {
      console.log("After getting areaCountList: " + (new Date()).toISOString());
      console.log("areaCountList:");
      console.log(areaCountList);
      

      res.set('Content-Type', 'application/json');
      res.send(areaCountList);
    })
    .catch(console.error)
    .done(function() {
      console.log("getCountByArea mongodb close");
      db.close();
      console.log("End: /api/getCountByArea");
    });

  
});

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
        console.log("areaCountList found");
        d.resolve(areaCountList);
  });

  return d.promise;

};
/* REST API getCountByArea */
/**************************/

/**************************/
/* REST API getCountByCat */
app.get('/api/getCountByCat', function (req, res) {


  console.log("Begin: /api/getCountByCat");
  var mongojs = require('mongojs');
  var db = mongojs(getMongoUri(), ["gnavi","category"]);

  console.log("Before getting catList: " + (new Date()).toISOString());
  getGnaviCats(db)
    .then(function(catList) {
      console.log("After getting catList: " + (new Date()).toISOString());
      console.log("catList:");
      console.log(catList);
      console.log("Before getting catCountList: " + (new Date()).toISOString());

      return getCountByCatList(db, catList);
    })
    .then(function(catCountList) {
      console.log("After getting catCountList: " + (new Date()).toISOString());
      console.log("catCountList:");
      console.log(catCountList);

      res.set('Content-Type', 'application/json');
      res.send(catCountList);
    })
    .catch(console.error)
    .done(function() {
      console.log("getCountByCat mongodb close");
      db.close();
      console.log("End: /api/getCountByCat");
    });
  
});

var getGnaviCats = function(db) {
  var d = Q.defer();

  db.category.findOne(function(err, catList) {
    if(err || !catList) 
    {
      d.reject(new Error(err));
    }
    else 
    {
      console.log("catList found");
      d.resolve(catList);

    }
  });

  return d.promise;
};

var getCountByCat = function(db, cat) {

  var d = Q.defer();

  db.gnavi.count({"code.category_code_l.0": cat.category_l_code}, function(err, count) {
    if (count == 0)
    {
      d.resolve({category_l_code: cat.category_l_code , category_l_name: cat.category_l_name, count: count});
    }
    else if (err || !count)
    {
      console.log(" err:" + err);
      d.reject(new Error(err));      
    }
    else 
    {
      d.resolve({category_l_code: cat.category_l_code , category_l_name: cat.category_l_name, count: count});
    }
  });

  return d.promise;
};

var getCountByCatList = function(db, catList) {
  var d = Q.defer();

  var prom = [];
  
  catList.category_l.forEach(function (cat) {
    prom.push(getCountByCat(db, cat));
  });


  Q.all(prom)
    .then(function (catCountList) {
        console.log("catCountList found");
        d.resolve(catCountList);
  });

  return d.promise;

};
/* REST API getCountByCat */
/**************************/

/**************************/
/* REST API getCountByCat */
app.get('/api/addIndex', function (req, res) {
  console.log("Begin: /api/addIndex");
  var mongojs = require('mongojs');
  var db = mongojs(getMongoUri(), ["gnavi"]);

  db.gnavi.ensureIndex( {"code.areacode": 1}, {name: "areacode"} );

  db.gnavi.ensureIndex( {"code.category_code_l.0": 1}, {name: "category_code_l"} );

  db.gnavi.ensureIndex( {"code.areacode": 1, "code.areaname": 1}, {name: "areacode_areaname"} );

  console.log("End: /api/addIndex");


});

app.get('/api/dropIndex', function (req, res) {
  console.log("Begin: /api/dropIndex");
  var mongojs = require('mongojs');
  var db = mongojs(getMongoUri(), ["gnavi"]);

  db.gnavi.dropIndexes();

  console.log("End: /api/dropIndex");


});
/* REST API getCountByCat */
/**************************/

/* tmp */
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
/* tmp */

/* group by */
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

// app.get('/api/getCountGroupByArea', function (req, res) {
//   console.log("Begin: /api/getCountGroupByArea");
//   var mongojs = require('mongojs');
//   var db = mongojs(getMongoUri(), ["gnavi"]);

//   console.log("Before getting areaCountList: " + (new Date()).toISOString());
//   getCountGroupByArea(db)
//     .then(function(areaCountList) {
//       console.log("After getting areaCountList: " + (new Date()).toISOString());
//       console.log("areaCountList");
//       res.set('Content-Type', 'application/json');
//       res.send(areaCountList);
//     })
//     .done(function() {
//       console.log("mongodb close");
//       db.close();
//     });

// });
/* group by */

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
