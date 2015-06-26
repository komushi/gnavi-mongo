var express = require("express");
var jsonmask = require("json-mask");
var prefsController = require("../controllers/prefsController");
var areasController = require("../controllers/areasController");
var countByAreaController = require("../controllers/countByAreaController");
var countByAreaCatController = require("../controllers/countByAreaCatController");



//configure routes
var router = express.Router();

/**************************/
/* REST API hello */
router.route('/api')
  .get(function (req, res) {
  res.send({routes: jsonmask(router.stack,"route/(path,stack/method)") });
  console.log("REST API is running.");
});
/* REST API hello */
/**************************/

/**************************/
/* REST API /api/prefectures */
router.route('/api/prefectures')
  .get(function (req, res) {
    prefsController.getPrefectures(req, res);
});
/* REST API /api/prefectures */
/**************************/

/**************************/
/* REST API /api/areas */
router.route('/api/areas')
  .get(function (req, res) {
    areasController.getAreas(req, res);
});
/* REST API /api/areas */
/**************************/


/**************************/
/* REST API /api/count_by_area */
router.route('/api/count_by_area')
  .get(function (req, res) {
    countByAreaController.getCountByArea(req, res);
});
/* REST API /api/count_by_area */
/**************************/


/**************************/
/* REST API /api/count_by_area_cat */
router.route('/api/count_by_area_cat')
  .post(function (req, res) {
    countByAreaCatController.getCountByAreaCat(req, res);
});
/* REST API /api/count_by_area_cat */
/**************************/



module.exports=router;