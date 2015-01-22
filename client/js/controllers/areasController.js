angular.module('gnaviApp').
  /* Areas controller */
  controller('areasController', 
    ['$scope', 'gnaviAPIservice', 'ngTableParams',
    function($scope, gnaviAPIservice, ngTableParams) {


    var model = {
      areaCountList:[]
    };

    var tableSlice = function(data, params){

      return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
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

    var initialize = function () {
        console.log("areasController initialize");

        gnaviAPIservice.getCountByArea().success(function (response) {

          angular.extend(model.areaCountList, response);

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

    initialize();

  }]);



 

