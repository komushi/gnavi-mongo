var gnaviAPIservice = function($injectHttp) {

    $http = $injectHttp;

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
      return $http({
        method: 'POST', 
        url: '/api/getCountByAreaCat',
        data: jsonParam,
        headers: {'Content-Type': 'application/json'}
      });
    };

    gnaviAPI.getCountByCatArea = function(jsonParam) {
      return $http({
        method: 'POST', 
        url: '/api/getCountByCatArea',
        data: jsonParam,
        headers: {'Content-Type': 'application/json'}
      });
    };
    return gnaviAPI;
};


var gnaviModule = angular.module('gnaviApp.services', []);
gnaviModule.factory('gnaviAPIservice', ['$http', gnaviAPIservice]);

