var mongodbManager = require('../utils/mongodbManager');

/**************************/
/* REST API ensureIndex */
exports.ensureIndex = function (req, res) {
  console.log("Begin: ensureIndex");

  var db = mongodbManager.getConnection(["gnavi"]);

  db.gnavi.ensureIndex( {"code.areacode": 1}, {name: "areacode"} );
  db.gnavi.ensureIndex( {"code.category_code_l.0": 1}, {name: "category_code_l"} );
  db.gnavi.ensureIndex( {"code.areacode": 1, "code.areaname": 1}, {name: "areacode_areaname"} );

  res.send("indexes ensured");

  console.log("End: ensureIndex");
};
/* REST API ensureIndex */
/**************************/

/**************************/
/* REST API dropIndex */
exports.dropIndex = function (req, res) {
  console.log("Begin: dropIndex");

  var db = mongodbManager.getConnection(["gnavi"]);

  db.gnavi.dropIndexes();

  res.send("indexes dropped");

  console.log("End: dropIndex");
};
/* REST API dropIndex */
/**************************/