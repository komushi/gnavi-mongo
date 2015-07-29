/**************************/
/* config */
var application_root = __dirname;
var express = require("express");
var path = require("path");
var Q = require("q");
var bodyParser = require('body-parser');
var routes = require('./routes/routes');
var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.disable('etag'); 
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
   extended: true 
}));

//app.use(express.static(path.join(application_root, "../client")));

app.use('/', routes);
/* config */
/**************************/

var server = app.listen((process.env.PORT || 9000), function() {
  console.log('Express server listening on port ' + server.address().port);
});

