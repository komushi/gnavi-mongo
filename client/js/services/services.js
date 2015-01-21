var gnaviAPIservice = function($injectHttp, $injectQ) {

    $http = $injectHttp;
    $q = $injectQ;

    var gnaviAPI = {};

    gnaviAPI.getGnaviPrefs = function() {
      return $http({
        method: 'GET', 
        url: '/api/getGnaviPrefs'
      });
    };

    gnaviAPI.getGnaviCats = function() {
      return $http({
        method: 'GET', 
        url: '/api/getGnaviCats'
      });
    };

    gnaviAPI.getGnaviAreas = function() {
      return $http({
        method: 'GET', 
        url: '/api/getGnaviAreas'
      });
    };

    gnaviAPI.getCountByArea = function() {
      return $http({
        method: 'GET', 
        url: '/api/getCountByArea'
      });
    };

    gnaviAPI.getCountByCat = function() {
      return $http({
        method: 'GET', 
        url: '/api/getCountByCat'
      });
    };

    gnaviAPI.getCountByAreaCat = function(jsonParam) {
      // console.log("gnaviAPI.getCountByAreaCat");
      // console.log(JSON.stringify(jsonParam));

      return $http({
        method: 'POST', 
        url: '/api/getCountByAreaCat',
        data: jsonParam,
        headers: {'Content-Type': 'application/json'}
      });
    };

    return gnaviAPI;
};


var gnaviModule = angular.module('gnaviApp.services', []);
gnaviModule.factory('gnaviAPIservice', ['$http', '$q', gnaviAPIservice]);

