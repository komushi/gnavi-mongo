var express = require("express");
var jsonmask = require("json-mask");
var catsController = require("../controllers/catsController");
var countByCatController = require("../controllers/countByCatController");
var countByCatAreaController = require("../controllers/countByCatAreaController");



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
/* REST API /api/categories */
router.route('/api/categories')
  .get(function (req, res) {
    catsController.getCategories(req, res);
});
/* REST API /api/categories */
/**************************/

/**************************/
/* REST API /api/count_by_category */
router.route('/api/count_by_category')
  .get(function (req, res) {
    countByCatController.getCountByCat(req, res);
});
/* REST API /api/count_by_category */
/**************************/

/**************************/
/* REST API /api/count_by_cat_area */
router.route('/api/count_by_cat_area')
  .post(function (req, res) {
    countByCatAreaController.getCountByCatArea(req, res);
});
/* REST API /api/count_by_cat_area */
/**************************/


module.exports=router;