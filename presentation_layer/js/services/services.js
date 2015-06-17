var gnaviAPIservice = function($injectHttp) {

    $http = $injectHttp;

    var gnaviAPI = {};
    var areaServiceURI = "http://gnavi-msa-bl-area.kolsch.mini.pez.pivotal.io";
    var catServiceURI = "http://gnavi-msa-bl-category.kolsch.mini.pez.pivotal.io";
    var indexServiceURI = "http://gnavi-msa-bl-index.kolsch.mini.pez.pivotal.io";

    gnaviAPI.getGnaviPrefs = function() {
      return $http({
        method: 'GET', 
        url: areaServiceURI + '/api/prefectures'
      });
    };

    gnaviAPI.getGnaviCats = function() {
      return $http({
        method: 'GET', 
        url: catServiceURI + '/api/categories'
      });
    };

    gnaviAPI.getGnaviAreas = function() {
      return $http({
        method: 'GET', 
        url: areaServiceURI + '/api/areas'
      });
    };

    gnaviAPI.getCountByArea = function() {
      return $http({
        method: 'GET', 
        url: areaServiceURI + '/api/count_by_area'
      });
    };

    gnaviAPI.getCountByCat = function() {
      return $http({
        method: 'GET', 
        url: catServiceURI + '/api/count_by_category'
      });
    };

    gnaviAPI.getCountByAreaCat = function(jsonParam) {
      return $http({
        method: 'POST', 
        url: areaServiceURI + '/api/count_by_area_cat',
        data: jsonParam,
        headers: {'Content-Type': 'application/json'}
      });
    };

    gnaviAPI.getCountByCatArea = function(jsonParam) {
      return $http({
        method: 'POST', 
        url: catServiceURI + '/api/count_by_cat_area',
        data: jsonParam,
        headers: {'Content-Type': 'application/json'}
      });
    };
    return gnaviAPI;
};


var gnaviModule = angular.module('gnaviApp.services', []);
gnaviModule.factory('gnaviAPIservice', ['$http', gnaviAPIservice]);

