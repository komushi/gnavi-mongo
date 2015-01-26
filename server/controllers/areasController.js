var Q = require("q");
var mongojs = require('mongojs');
var mongodbManager = require('../utils/mongodbManager');



/**************************/
/* REST API getGnaviAreas */
exports.getGnaviAreas = function (req, res) {
  console.log("Begin: /api/getGnaviAreas");
  console.log("Before getting areaList: " + (new Date()).toISOString());

  var db = mongodbManager.getConnection(["area"]);

  getGnaviAreasPromise(db)
    .then(function(areaList) {
      console.log("After getting areaList: " + (new Date()).toISOString());
      console.log("areaList:");
      console.log(areaList);

      res.set('Content-Type', 'application/json');
      res.send(areaList);
    })
    .done(function() {
      console.log("getGnaviAreas mongodb close");
      db.close();
      console.log("End: /api/getGnaviAreas");
    });
};

exports.getGnaviAreasPromise = function(db) {
  return getGnaviAreasPromise(db);
};

var getGnaviAreasPromise = function(db) {
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
/* REST API getGnaviAreas */
/**************************/
