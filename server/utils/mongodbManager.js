var mongojs = require('mongojs');
var uri;

var getMongoUri = function() {
  if (!uri)
  {
    var cfenv = require("cfenv");
    var appEnv = cfenv.getAppEnv();
    var services = appEnv.getServices();
    var mongodbService = process.env["SERVICE_NAME"];

    var myservice = appEnv.getService(mongodbService);
    var credentials = myservice.credentials;

    uri = credentials.uri;
  }

  return uri;
};


exports.getConnection = function(collections) {
  var db = mongojs(getMongoUri(), collections);
  return db;

};
