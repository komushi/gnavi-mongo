var Q = require("q");
var mongodbManager = require('../utils/mongodbManager');


/*****************************************/
/* REST API controller getCountByCatArea */
exports.getCountByCatArea = function (req, res) {
  console.log("Begin: getCountByCatArea");
  console.log("Before getting catAreaCountList: " + (new Date()).toISOString());

  var db = mongodbManager.getConnection(["gnavi"]);

  getCountByCatListAreaListPromise(db, req.body.areaList ,req.body.catList )
    .then(function(catAreaCountList) {
      console.log("After getting catAreaCountList: " + (new Date()).toISOString());
      console.log("catAreaCountList:");
      console.log(JSON.stringify(catAreaCountList));

      res.set('Content-Type', 'application/json');
      res.send(catAreaCountList);
    })
    .catch(console.error)
    .done(function() {
      console.log("getCountByCatArea mongodb close");
      db.close();
      console.log("End: getCountByCatArea");
    });
};


var getCountByCatAreaPromise = function(db, area, cat) {
  // console.log("area:");
  // console.log(area);

  // console.log("cat:");
  // console.log(cat);

  var d = Q.defer();

  db.gnavi.count({"code.category_code_l.0": cat.category_l_code, "code.areacode": area.area_code}, function(err, count) {
    if (count == 0)
    {
      var jsonObj = JSON.parse('["' + area.area_name + '",' + count + ']');

      d.resolve(jsonObj);
    }
    else if (err || !count)
    {
      console.log(" err:" + err);
      d.reject(new Error(err));      
    }
    else 
    {
      var jsonObj = JSON.parse('["' + area.area_name + '",' + count + ']');

      d.resolve(jsonObj);
    }
  });

  return d.promise;
};

var getCountByCatAreaListPromise = function(db, areaList, cat) {
  var d = Q.defer();

  var prom = [];
  

  areaList.forEach(function (area) {
    prom.push(getCountByCatAreaPromise(db, area, cat));
  });    



  Q.all(prom)
    .then(function (singleCatAreaCountList) {
        console.log("singleCatAreaCountList found");
        var result = {key:cat.category_l_name, values: singleCatAreaCountList};
        d.resolve(result);
  });

  return d.promise;

};

var getCountByCatListAreaListPromise = function(db, areaList, catList) {
  var d = Q.defer();

  var prom = [];
  
  catList.forEach(function (cat) {
      prom.push(getCountByCatAreaListPromise(db, areaList, cat)); 
  });


  Q.all(prom)
    .then(function (catAreaCountList) {
        console.log("catAreaCountList found");
        d.resolve(catAreaCountList);
  });

  return d.promise;

};
/* REST API controller getCountByCatArea */
/*****************************************/
