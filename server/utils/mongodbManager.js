var mongojs = require('mongojs');
var uri;

var getMongoUri = function() {

  // return "mongodb://CloudFoundry_ids0og1r_kpbkabek_25ecekf5:e-UwL2MCfCS5H5LWIlec8FSdWOHwZfAw@ds031601.mongolab.com:31601/CloudFoundry_ids0og1r_kpbkabek";

  if (!uri)
  {
    var cfenv = require("cfenv");
    var appEnv = cfenv.getAppEnv();
    var services = appEnv.getServices();
    
    var myservice = appEnv.getService("gnavi_mongo");
    var credentials = myservice.credentials;
    
    uri = credentials.uri;
  }
  
  return uri;
};


exports.getConnection = function(collections) {
  var db = mongojs(getMongoUri(), collections);
  return db;

};
