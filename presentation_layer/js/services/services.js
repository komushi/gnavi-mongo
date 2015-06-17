var gnaviAPIservice = function($injectHttp) {

    $http = $injectHttp;

    var gnaviAPI = {};
    var serviceURI = "http://gnavi-msa-bl.kolsch.mini.pez.pivotal.io";

    gnaviAPI.getGnaviPrefs = function() {
      return $http({
        method: 'GET', 
        url: serviceURI + '/api/getGnaviPrefs'
      });
    };

    gnaviAPI.getGnaviCats = function() {
      return $http({
        method: 'GET', 
        url: serviceURI + '/api/getGnaviCats'
      });
    };

    gnaviAPI.getGnaviAreas = function() {
      return $http({
        method: 'GET', 
        url: serviceURI + '/api/getGnaviAreas'
      });
    };

    gnaviAPI.getCountByArea = function() {
      return $http({
        method: 'GET', 
        url: serviceURI + '/api/getCountByArea'
      });
    };

    gnaviAPI.getCountByCat = function() {
      return $http({
        method: 'GET', 
        url: serviceURI + '/api/getCountByCat'
      });
    };

    gnaviAPI.getCountByAreaCat = function(jsonParam) {
      return $http({
        method: 'POST', 
        url: serviceURI + '/api/getCountByAreaCat',
        data: jsonParam,
        headers: {'Content-Type': 'application/json'}
      });
    };

    gnaviAPI.getCountByCatArea = function(jsonParam) {
      return $http({
        method: 'POST', 
        url: serviceURI + '/api/getCountByCatArea',
        data: jsonParam,
        headers: {'Content-Type': 'application/json'}
      });
    };
    return gnaviAPI;
};


var gnaviModule = angular.module('gnaviApp.services', []);
gnaviModule.factory('gnaviAPIservice', ['$http', gnaviAPIservice]);

