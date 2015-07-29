var Q = require("q");
var mongodbManager = require('../utils/mongodbManager');
var catsController = require("./catsController");


/*************************************/
/* REST API controller getCountByCat */
exports.getCountByCat = function (req, res) {
  console.log("Begin: getCountByCat");
  console.log("Before getting catList: " + (new Date()).toISOString());

  var db = mongodbManager.getConnection(["gnavi","category"]);

  catsController.getCategoriesPromise(db)
    .then(function(catList) {
      console.log("After getting catList: " + (new Date()).toISOString());
      console.log("catList:");
      console.log(catList);
      console.log("Before getting catCountList: " + (new Date()).toISOString());

      return getCountByCatListPromise(db, catList);
    })
    .then(function(catCountList) {
      console.log("After getting catCountList: " + (new Date()).toISOString());

      catCountList.sort(function(a, b) {
          return parseFloat(b.count) - parseFloat(a.count);
      });

      console.log("catCountList:");
      console.log(catCountList);

      res.set('Content-Type', 'application/json');
      res.send(catCountList);
    })
    .catch(console.error)
    .done(function() {
      console.log("getCountByCat mongodb close");
      db.close();
      console.log("End: getCountByCat");
    });
  

};

var getCountByCatPromise = function(db, cat) {

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

var getCountByCatListPromise = function(db, catList) {
  var d = Q.defer();

  var prom = [];
  
  catList.category_l.forEach(function (cat) {
    prom.push(getCountByCatPromise(db, cat));
  });


  Q.all(prom)
    .then(function (catCountList) {
        console.log("catCountList found");
        d.resolve(catCountList);
  });

  return d.promise;

};

/* REST API controller getCountByCat */
/*************************************/
