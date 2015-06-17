var gnaviAPIservice = function($injectHttp) {

    $http = $injectHttp;

    var gnaviAPI = {};
    var areaServiceURI = "http://gnavi-msa-bl-area.kolsch.mini.pez.pivotal.io";
    var catServiceURI = "http://gnavi-msa-bl-category.kolsch.mini.pez.pivotal.io";
    var indexServiceURI = "http://gnavi-msa-bl-index.kolsch.mini.pez.pivotal.io";

    gnaviAPI.getGnaviPrefs = function() {
      return $http({
        method: 'GET', 
        url: areaServiceURI + '/api/getGnaviPrefs'
      });
    };

    gnaviAPI.getGnaviCats = function() {
      return $http({
        method: 'GET', 
        url: catServiceURI + '/api/getGnaviCats'
      });
    };

    gnaviAPI.getGnaviAreas = function() {
      return $http({
        method: 'GET', 
        url: areaServiceURI + '/api/getGnaviAreas'
      });
    };

    gnaviAPI.getCountByArea = function() {
      return $http({
        method: 'GET', 
        url: areaServiceURI + '/api/getCountByArea'
      });
    };

    gnaviAPI.getCountByCat = function() {
      return $http({
        method: 'GET', 
        url: catServiceURI + '/api/getCountByCat'
      });
    };

    gnaviAPI.getCountByAreaCat = function(jsonParam) {
      return $http({
        method: 'POST', 
        url: areaServiceURI + '/api/getCountByAreaCat',
        data: jsonParam,
        headers: {'Content-Type': 'application/json'}
      });
    };

    gnaviAPI.getCountByCatArea = function(jsonParam) {
      return $http({
        method: 'POST', 
        url: catServiceURI + '/api/getCountByCatArea',
        data: jsonParam,
        headers: {'Content-Type': 'application/json'}
      });
    };
    return gnaviAPI;
};


var gnaviModule = angular.module('gnaviApp.services', []);
gnaviModule.factory('gnaviAPIservice', ['$http', gnaviAPIservice]);

