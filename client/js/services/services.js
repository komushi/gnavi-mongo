var gnaviAPIservice = function($injectHttp, $injectQ) {

    $q = $injectQ;
    $http = $injectHttp;

    // var AreaList = function() {};

    var gnaviAPI = {};

    gnaviAPI.getPrefs = function() {
      return $http({
        method: 'GET', 
        url: '/getGnaviPrefs'
      });
    };

    gnaviAPI.getCountGroupByArea = function() {
      return $http({
        method: 'GET', 
        url: '/getCountGroupByArea'
      });
    };

    gnaviAPI.getAreas = function() {
      var deferred = $q.defer();
      var uri = '/getGnaviAreas';
      $http({
        method: 'GET', 
        url: uri
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function () {
        deferred.reject('Failed to get Collection List');
      });
      return deferred.promise;
    };

    gnaviAPI.getCats = function() {
      var deferred = $q.defer();
      var uri = '/getGnaviCats';
      $http({
        method: 'GET', 
        url: uri
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function () {
        deferred.reject('Failed to get Collection List');
      });
      return deferred.promise;
    };

    gnaviAPI.getRestByArea = function(areaCode) {
      var deferred = $q.defer();
      var uri = '/getGnaviRestByArea/?area=' + areaCode;
      $http({
        method: 'GET', 
        url: uri
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function () {
        deferred.reject('Failed to get Collection List');
      });
      return deferred.promise;
    };

    gnaviAPI.getRestByCat = function(catCode) {
      var deferred = $q.defer();
      var uri = '/getGnaviRestByCat/?category_l=' + catCode;
      $http({
        method: 'GET', 
        url: uri
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function () {
        deferred.reject('Failed to get Collection List');
      });
      return deferred.promise;
    };

    gnaviAPI.getRestByAreaCat = function(areaCode, catCode) {
      var deferred = $q.defer();
      var uri = '/getGnaviRestByAreaCat/?category_l=' + catCode + '&area=' + areaCode;
      
      $http({
        method: 'GET', 
        url: uri
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function () {
        deferred.reject('Failed to get Collection List');
      });
      return deferred.promise;
    };

    return gnaviAPI;
};


var gnaviModule = angular.module('gnaviApp.services', []);
gnaviModule.factory('gnaviAPIservice', ['$http', '$q', gnaviAPIservice]);

