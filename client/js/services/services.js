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

    gnaviAPI.getCountByAreaCat = function(areaList, catList) {
      return $http({
        method: 'GET', 
        url: '/api/getCountByAreaCat'
      });
    };

    return gnaviAPI;
};


var gnaviModule = angular.module('gnaviApp.services', []);
gnaviModule.factory('gnaviAPIservice', ['$http', '$q', gnaviAPIservice]);

