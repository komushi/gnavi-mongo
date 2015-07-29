var Q = require("q");
var mongodbManager = require('../utils/mongodbManager');



/**************************************/
/* REST API controller getPrefectures */
exports.getPrefectures = function (req, res) {
  console.log("Begin: getPrefectures");
  console.log("Before getting prefectureList: " + (new Date()).toISOString());

  var db = mongodbManager.getConnection(["prefecture"]);
  
  getPrefecturesPromise(db)
    .then(function(prefectureList) {
      console.log("After getting prefectureList: " + (new Date()).toISOString());
      console.log("prefectureList:");
      console.log(prefectureList);

      res.set('Content-Type', 'application/json');
      res.send(prefectureList);
    })
    .catch(console.error)
    .done(function() {
      console.log("getPrefectures mongodb close");
      db.close();
      console.log("End: getPrefectures");
    });
};

var getPrefecturesPromise = function(db) {
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

/* REST API controller getPrefectures */
/**************************************/