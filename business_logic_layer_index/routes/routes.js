var express = require("express");

var indexController = require("../controllers/indexController");



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
/* REST API ensureIndex */
router.route('/api/index')
  .put(function (req, res) {
    indexController.ensureIndex(req, res);
});
/* REST API ensureIndex */
/**************************/

/**************************/
/* REST API dropIndex */
router.route('/api/index')
  .delete(function (req, res) {
    indexController.dropIndex(req, res);
});
/* REST API dropIndex */
/**************************/


module.exports=router;