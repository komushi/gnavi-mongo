var Q = require("q");
var mongodbManager = require('../utils/mongodbManager');



/********************************/
/* REST API controller getAreas */
exports.getAreas = function (req, res) {
  console.log("Begin: getAreas");
  console.log("Before getting areaList: " + (new Date()).toISOString());

  var db = mongodbManager.getConnection(["area"]);

  getAreasPromise(db)
    .then(function(areaList) {
      console.log("After getting areaList: " + (new Date()).toISOString());
      console.log("areaList:");
      console.log(areaList);

      res.set('Content-Type', 'application/json');
      res.send(areaList);
    })
    .catch(console.error)
    .done(function() {
      console.log("getAreas mongodb close");
      db.close();
      console.log("End: getAreas");
    });
};

exports.getAreasPromise = function(db) {
  return getAreasPromise(db);
};

var getAreasPromise = function(db) {
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

/* REST API controller getAreas */
/********************************/