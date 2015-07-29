var Q = require("q");
var mongodbManager = require('../utils/mongodbManager');
var areasController = require("./areasController");


/**************************************/
/* REST API controller getCountByArea */
exports.getCountByArea = function (req, res) {
  console.log("Begin: getCountByArea");
  console.log("Before getting areaList: " + (new Date()).toISOString());

  
  var db = mongodbManager.getConnection(["gnavi","area"]);

  areasController.getAreasPromise(db)
    .then(function(areaList) {
        console.log("After getting areaList: " + (new Date()).toISOString());
        console.log("areaList:");
        console.log(areaList);
        console.log("Before getting areaCountList: " + (new Date()).toISOString());

        return getCountByAreaListPromise(db, areaList);
    })
    .then(function(areaCountList) {
      console.log("After getting areaCountList: " + (new Date()).toISOString());

      areaCountList.sort(function(a, b) {
          return parseFloat(b.count) - parseFloat(a.count);
      });

      console.log("areaCountList:");
      console.log(areaCountList);
      

      res.set('Content-Type', 'application/json');
      res.send(areaCountList);
    })
    .catch(console.error)
    .done(function() {
      console.log("getCountByArea mongodb close");
      db.close();
      console.log("End: getCountByArea");
    });

};

var getCountByAreaPromise = function(db, area) {

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

var getCountByAreaListPromise = function(db, areaList) {
  var d = Q.defer();

  var prom = [];
  areaList.area.forEach(function (area) {
    prom.push(getCountByAreaPromise(db, area));
  });


  Q.all(prom)
    .then(function (areaCountList) {
        console.log("areaCountList found");
        d.resolve(areaCountList);
  });

  return d.promise;

};

/* REST API controller getCountByArea */
/**************************************/
