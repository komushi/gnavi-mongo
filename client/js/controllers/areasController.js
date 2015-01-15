angular.module('gnaviApp').
  controller('areasController', 
    ['$scope', '$q', 'gnaviAPIservice', 'ngTableParams',
    function($scope, $q, gnaviAPIservice, ngTableParams) {


    var model = {
      areaCountList:[]
    };

    var getRest = function(areaCode, callback) {

        return gnaviAPIservice.getRestByArea(areaCode).then(
          function(data) {
            return callback(data);
          }
        );

    };

    var getRestCount = function(areaList, callback){
      var prom = [];
      var areaCountList = [];
      areaList.forEach(function (obj, i) {
          prom.push(getRest(obj.area_code, function(data){
              // var jsonObj = angular.fromJson('{"area_name":"' + data.rest.code.areaname + '","count":' + data.total_hit_count + '}');

              var jsonObj = angular.fromJson(
                '{"area_name":"' + data.rest.code.areaname + 
                '","area_code":"' + data.rest.code.areacode + 
                '","count":' + data.total_hit_count + '}');

              areaCountList.push(jsonObj);
          }));
      });
      $q.all(prom).then(function () {

          console.log(areaCountList);
          callback(areaCountList);
      });
    };

    var tableSlice = function(data, params){

      return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
    };

    var initData = function (response) {
      
      // angular.extend(model.areaList, response.area);

      getRestCount(response.area, function (areaCountList) {
          
        angular.extend(model.areaCountList, areaCountList);

        var tableParams = 
          new ngTableParams({
              page: 1,            // show first page
              count:10           // count per page
          }, {
              total: model.areaCountList.length, // length of data
              getData: function($defer, params) {
                  $defer.resolve(tableSlice(model.areaCountList, params));
              }
          });

        angular.extend($scope, {
          model: model,
          tableParams: tableParams,
          xFunction: xFunction,
          yFunction: yFunction,
          descriptionFunction: descriptionFunction
        });


      });
    };

    var xFunction = function(){
        return function(d) {
            return d.area_name;
        }
    };

    var yFunction = function(){
        return function(d) {
            return d.count;
        }
    };

    var descriptionFunction = function(){
        return function(d){
            return d.area_name;
        }
    };


    gnaviAPIservice.getAreas().then(function(response) {
      initData(response);
      
    });

    



  }]);



 

