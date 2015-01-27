var express = require("express");
var prefsController = require("../controllers/prefsController");
var areasController = require("../controllers/areasController");
var catsController = require("../controllers/catsController");
var countByAreaController = require("../controllers/countByAreaController");
var countByCatController = require("../controllers/countByCatController");
var countByAreaCatController = require("../controllers/countByAreaCatController");
var countByCatAreaController = require("../controllers/countByCatAreaController");
var indexController = require("../controllers/indexController");



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

/**************************/
/* REST API /api/getCountByCat */
router.route('/api/getCountByCatArea')
  .post(function (req, res) {
    countByCatAreaController.getCountByCatArea(req, res);
});
/* REST API /api/getCountByCat */
/**************************/

/**************************/
/* REST API ensureIndex */
router.route('/api/ensureIndex')
  .get(function (req, res) {
    indexController.ensureIndex(req, res);
});
/* REST API ensureIndex */
/**************************/

/**************************/
/* REST API dropIndex */
router.route('/api/dropIndex')
  .get(function (req, res) {
    indexController.dropIndex(req, res);
});
/* REST API dropIndex */
/**************************/


module.exports=router;