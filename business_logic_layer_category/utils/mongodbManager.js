var mongojs = require('mongojs');
var uri;

var getMongoUri = function() {
  if (!uri)
  {
    var cfenv = require("cfenv");
    var appEnv = cfenv.getAppEnv();
    var services = appEnv.getServices();

    for (service in services) {
      if (services[service].tags.indexOf("mongodb") >= 0 || services[service].label == "mongolab") {
        var credentials = services[service]["credentials"]
        uri = credentials.uri;

        console.log("Found ", service, " ", credentials);

        break;
      }
    }
  }

  return uri;
};

exports.getConnection = function(collections) {
  var db = mongojs(getMongoUri(), collections);
  
  return db;

};
