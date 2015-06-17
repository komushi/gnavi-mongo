var express = require("express");
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
/* REST API /api/getCountByArea */
router.route('/api/getCountByArea')
  .get(function (req, res) {
    countByAreaController.getCountByArea(req, res);
});
/* REST API /api/getCountByArea */
/**************************/


/**************************/
/* REST API /api/getCountByCat */
router.route('/api/getCountByAreaCat')
  .post(function (req, res) {
    countByAreaCatController.getCountByAreaCat(req, res);
});
/* REST API /api/getCountByCat */
/**************************/



module.exports=router;