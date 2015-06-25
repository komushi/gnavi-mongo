var gnaviAPIservice = function($injectHttp, $q) {

    $http = $injectHttp;

    var gnaviAPI = {};
    var areaServiceURI = "http://gnavi-msa-bl-area.kolsch.mini.pez.pivotal.io";
    var catServiceURI = "http://gnavi-msa-bl-category.kolsch.mini.pez.pivotal.io";
    var indexServiceURI = "http://gnavi-msa-bl-index.kolsch.mini.pez.pivotal.io";

    gnaviAPI.getGnaviPrefs = function() {
      var deferred = $q.defer();

      $http({
        method: 'GET', 
        url: areaServiceURI + '/api/prefectures'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data, status, headers, config) {
        deferred.reject(status + " " + data);
      });

      return deferred.promise;
    };

    gnaviAPI.getGnaviCats = function() {
      var deferred = $q.defer();

      $http({
        method: 'GET', 
        url: catServiceURI + '/api/categories'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data, status, headers, config) {
        deferred.reject(status + " " + data);
      });

      return deferred.promise;
    };

    gnaviAPI.getGnaviAreas = function() {
      var deferred = $q.defer();

      $http({
        method: 'GET', 
        url: areaServiceURI + '/api/areas'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data, status, headers, config) {
        deferred.reject(status + " " + data);
      });

      return deferred.promise;
    };

    gnaviAPI.getCountByArea = function() {
      var deferred = $q.defer();

      $http({
        method: 'GET', 
        url: areaServiceURI + '/api/count_by_area'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data, status, headers, config) {
        deferred.reject(status + " " + data);
      });

      return deferred.promise;
    };

    gnaviAPI.getCountByCat = function() {
      var deferred = $q.defer();

      $http({
        method: 'GET', 
        url: catServiceURI + '/api/count_by_category'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data, status, headers, config) {
        deferred.reject(status + " " + data);
      });

      return deferred.promise;
    };

    gnaviAPI.getCountByAreaCat = function(jsonParam) {
      var deferred = $q.defer();

      $http({
        method: 'POST', 
        url: areaServiceURI + '/api/count_by_area_cat',
        data: jsonParam,
        headers: {'Content-Type': 'application/json'}
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data, status, headers, config) {
        deferred.reject(status + " " + data);
      });

      return deferred.promise;
    };

    gnaviAPI.getCountByCatArea = function(jsonParam) {
      var deferred = $q.defer();

      $http({
        method: 'POST', 
        url: catServiceURI + '/api/count_by_cat_area',
        data: jsonParam,
        headers: {'Content-Type': 'application/json'}
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data, status, headers, config) {
        deferred.reject(status + " " + data);
      });

      return deferred.promise;
    };

    return gnaviAPI;
};


var gnaviModule = angular.module('gnaviApp.services', []);
gnaviModule.factory('gnaviAPIservice', ['$http', '$q', gnaviAPIservice]);

