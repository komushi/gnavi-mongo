var Q = require("q");
var mongodbManager = require('../utils/mongodbManager');



/*************************************/
/* REST API controller getCategories */
exports.getCategories = function (req, res) {
  console.log("Begin: getCategories");
  console.log("Before getting catList: " + (new Date()).toISOString());

  var db = mongodbManager.getConnection(["category"]);

  getCategoriesPromise(db)
    .then(function(catList) {
      console.log("After getting catList: " + (new Date()).toISOString());
      console.log("catList:");
      console.log(catList);

      res.set('Content-Type', 'application/json');
      res.send(catList);
    })
    .catch(console.error)
    .done(function() {
      console.log("getCategories mongodb close");
      db.close();
      console.log("End: getCategories");
    });
};

exports.getCategoriesPromise = function(db) {
  return getCategoriesPromise(db);
};

var getCategoriesPromise = function(db) {
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
/* REST API controller getCategories */
/*************************************/

