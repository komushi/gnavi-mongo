var express = require("express");
var prefsController = require("../controllers/prefsController");
var areasController = require("../controllers/areasController");
var catsController = require("../controllers/catsController");
var countByAreaController = require("../controllers/countByAreaController");
var countByCatController = require("../controllers/countByCatController");
var countByAreaCatController = require("../controllers/countByAreaCatController");

//configure routes
var router = express.Router();

/**************************/
/* REST API hello */
router.route('/api', function (req, res) {
   res.send('REST API is running.');
   console.log("REST API is running.");
});
/* REST API hello */
/**************************/

/**************************/
/* REST API /api/getGnaviPrefs */
router.route('/api/getGnaviPrefs')
  .get(function (req, res) {
    prefsController.getGnaviPrefs(req, res);
});
/* REST API /api/getGnaviPrefs */
/**************************/

/**************************/
/* REST API /api/getGnaviAreas */
router.route('/api/getGnaviAreas')
  .get(function (req, res) {
    areasController.getGnaviAreas(req, res);
});
/* REST API /api/getGnaviAreas */
/**************************/

/**************************/
/* REST API /api/getGnaviCats */
router.route('/api/getGnaviCats')
  .get(function (req, res) {
    catsController.getGnaviCats(req, res);
});
/* REST API /api/getGnaviCats */
/**************************/

/**************************/
/* REST API /api/getCountByArea */
router.route('/api/getCountByArea')
  .get(function (req, res) {
    countByAreaController.getCountByArea(req, res);
});
/* REST API /api/getCountByArea */
/**************************/

/**************************/
/* REST API /api/getCountByCat */
router.route('/api/getCountByCat')
  .get(function (req, res) {
    countByCatController.getCountByCat(req, res);
});
/* REST API /api/getCountByCat */
/**************************/

/**************************/
/* REST API /api/getCountByCat */
router.route('/api/getCountByAreaCat')
  .post(function (req, res) {
    countByAreaCatController.getCountByAreaCat(req, res);
});
/* REST API /api/getCountByCat */
/**************************/


// /**************************/
// /* REST API addIndex */
// app.get('/api/addIndex', function (req, res) {
//   console.log("Begin: /api/addIndex");
//   var mongojs = require('mongojs');
//   var db = mongojs(getMongoUri(), ["gnavi"]);

//   db.gnavi.ensureIndex( {"code.areacode": 1}, {name: "areacode"} );

//   db.gnavi.ensureIndex( {"code.category_code_l.0": 1}, {name: "category_code_l"} );

//   db.gnavi.ensureIndex( {"code.areacode": 1, "code.areaname": 1}, {name: "areacode_areaname"} );

//   console.log("End: /api/addIndex");


// });

// app.get('/api/dropIndex', function (req, res) {
//   console.log("Begin: /api/dropIndex");
//   var mongojs = require('mongojs');
//   var db = mongojs(getMongoUri(), ["gnavi"]);

//   db.gnavi.dropIndexes();

//   console.log("End: /api/dropIndex");


// });
// /* REST API addIndex */
// /**************************/





// /**************************/
// /* REST API getCountByCatArea */

// var getCountByCatArea = function(db, area, cat) {
//   // console.log("area:");
//   // console.log(area);

//   // console.log("cat:");
//   // console.log(cat);

//   var d = Q.defer();

//   db.gnavi.count({"code.category_code_l.0": cat.category_l_code, "code.areacode": area.area_code}, function(err, count) {
//     if (count == 0)
//     {
//       var jsonObj = JSON.parse('["' + area.area_name + '",' + count + ']');

//       d.resolve(jsonObj);
//     }
//     else if (err || !count)
//     {
//       console.log(" err:" + err);
//       d.reject(new Error(err));      
//     }
//     else 
//     {
//       var jsonObj = JSON.parse('["' + area.area_name + '",' + count + ']');

//       d.resolve(jsonObj);
//     }
//   });

//   return d.promise;
// };

// var getCountByCatAreaList = function(db, areaList, cat) {
//   var d = Q.defer();

//   var prom = [];
  

//   areaList.forEach(function (area) {
//     prom.push(getCountByCatArea(db, area, cat));
//   });    



//   Q.all(prom)
//     .then(function (singleCatAreaCountList) {
//         console.log("singleCatAreaCountList found");
//         var result = {key:cat.category_l_name, values: singleCatAreaCountList};
//         d.resolve(result);
//   });

//   return d.promise;

// };

// var getCountByCatListAreaList = function(db, areaList, catList) {
//   var d = Q.defer();

//   var prom = [];
  
//   catList.forEach(function (cat) {
//       prom.push(getCountByCatAreaList(db, areaList, cat)); 
//   });


//   Q.all(prom)
//     .then(function (catAreaCountList) {
//         console.log("catAreaCountList found");
//         d.resolve(catAreaCountList);
//   });

//   return d.promise;

// };

// app.post('/api/getCountByCatArea', function (req, res) {
//   console.log("Begin: /api/getCountByCatArea");
//   console.log("req.body:");
//   console.log(req.body);

//   var mongojs = require('mongojs');
//   var db = mongojs(getMongoUri(), ["gnavi"]);
  
//   console.log("Before getting catAreaCountList: " + (new Date()).toISOString());
//   getCountByCatListAreaList(db, req.body.areaList ,req.body.catList )
//     .then(function(catAreaCountList) {
//       console.log("After getting catAreaCountList: " + (new Date()).toISOString());
//       console.log("catAreaCountList:");
//       console.log(JSON.stringify(catAreaCountList));

//       res.set('Content-Type', 'application/json');
//       res.send(catAreaCountList);
//     })
//     .done(function() {
//       console.log("getCountByCatArea mongodb close");
//       db.close();
//       console.log("End: /api/getCountByCatArea");
//     });

  
// });
module.exports=router;