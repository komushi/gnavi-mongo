var Q = require("q");
var mongodbManager = require('../utils/mongodbManager');


/*****************************************/
/* REST API controller getCountByAreaCat */
exports.getCountByAreaCat = function (req, res) {
  console.log("Begin: getCountByAreaCat");
  console.log("Before getting areaCatCountList: " + (new Date()).toISOString());

  var db = mongodbManager.getConnection(["gnavi"]);

  getCountByAreaListCatListPromise(db, req.body.areaList ,req.body.catList )
    .then(function(areaCatCountList) {
      console.log("After getting areaCatCountList: " + (new Date()).toISOString());
      console.log("areaCatCountList:");
      console.log(JSON.stringify(areaCatCountList));

      res.set('Content-Type', 'application/json');
      res.send(areaCatCountList);
    })
    .catch(console.error)
    .done(function() {
      console.log("getCountByAreaCat mongodb close");
      db.close();
      console.log("End: getCountByAreaCat");
    });
  

};

var getCountByAreaCatPromise = function(db, area, cat) {
  // console.log("area:");
  // console.log(area);

  // console.log("cat:");
  // console.log(cat);

  var d = Q.defer();

  db.gnavi.count({"code.category_code_l.0": cat.category_l_code, "code.areacode": area.area_code}, function(err, count) {
    if (count == 0)
    {
      // d.resolve({area_code: area.area_code, area_name: area.area_name, category_l_code: cat.category_l_code , category_l_name: cat.category_l_name, count: count});
      // d.resolve({category_l_code: cat.category_l_code , category_l_name: cat.category_l_name, count: count});
      var jsonObj = JSON.parse('["' + cat.category_l_name + '",' + count + ']');

      d.resolve(jsonObj);
    }
    else if (err || !count)
    {
      console.log(" err:" + err);
      d.reject(new Error(err));      
    }
    else 
    {
      // d.resolve({area_code: area.area_code, area_name: area.area_name, category_l_code: cat.category_l_code , category_l_name: cat.category_l_name, count: count});
      var jsonObj = JSON.parse('["' + cat.category_l_name + '",' + count + ']');

      d.resolve(jsonObj);
    }
  });

  return d.promise;
};

var getCountByAreaCatListPromise = function(db, area, catList) {
  var d = Q.defer();

  var prom = [];
  

  catList.forEach(function (cat) {
    prom.push(getCountByAreaCatPromise(db, area, cat));
  });    



  Q.all(prom)
    .then(function (singleAreaCatCountList) {
        console.log("singleAreaCatCountList found");
        var result = {key:area.area_name, values: singleAreaCatCountList};
        d.resolve(result);
  });

  return d.promise;

};

var getCountByAreaListCatListPromise = function(db, areaList, catList) {
  var d = Q.defer();

  var prom = [];
  
  areaList.forEach(function (area) {
      prom.push(getCountByAreaCatListPromise(db, area, catList)); 
  });


  Q.all(prom)
    .then(function (areaCatCountList) {
        console.log("areaCatCountList found");
        d.resolve(areaCatCountList);
  });

  return d.promise;

};
/* REST API controller getCountByAreaCat */
/*****************************************/