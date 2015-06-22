var Q = require("q");
var mongodbManager = require('../utils/mongodbManager');

/**************************/
/* REST API getGnaviPrefs */
exports.getGnaviPrefs = function (req, res) {
  console.log("Begin: /api/getGnaviPrefs");
  console.log("Before getting prefectureList: " + (new Date()).toISOString());

  var db = mongodbManager.getConnection(["prefecture"]);
  
  getGnaviPrefsPromise(db)
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
};

var getGnaviPrefsPromise = function(db) {
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