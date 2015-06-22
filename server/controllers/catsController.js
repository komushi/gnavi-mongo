var Q = require("q");
var mongodbManager = require('../utils/mongodbManager');



/**************************/
/* REST API getGnaviCats */
exports.getGnaviCats = function (req, res) {
  console.log("Begin: /api/getGnaviCats");
  console.log("Before getting catList: " + (new Date()).toISOString());

  var db = mongodbManager.getConnection(["category"]);

  getGnaviCatsPromise(db)
    .then(function(catList) {
      console.log("After getting catList: " + (new Date()).toISOString());
      console.log("catList:");
      console.log(catList);

      res.set('Content-Type', 'application/json');
      res.send(catList);
    })
    .done(function() {
      console.log("getGnaviCats mongodb close");
      db.close();
      console.log("End: /api/getGnaviCats");
    });
};

exports.getGnaviCatsPromise = function(db) {
  return getGnaviCatsPromise(db);
};

var getGnaviCatsPromise = function(db) {
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
/* REST API getGnaviCats */
/**************************/

