var express = require("express");
var catsController = require("../controllers/catsController");
var countByCatController = require("../controllers/countByCatController");
var countByCatAreaController = require("../controllers/countByCatAreaController");



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
/* REST API /api/getGnaviCats */
router.route('/api/getGnaviCats')
  .get(function (req, res) {
    catsController.getGnaviCats(req, res);
});
/* REST API /api/getGnaviCats */
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
router.route('/api/getCountByCatArea')
  .post(function (req, res) {
    countByCatAreaController.getCountByCatArea(req, res);
});
/* REST API /api/getCountByCat */
/**************************/


module.exports=router;