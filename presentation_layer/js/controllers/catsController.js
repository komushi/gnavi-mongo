
angular.module('gnaviApp').
  /* Cats controller */
  controller('catsController', 
    ['$scope', 'gnaviAPIservice', 'ngTableParams',
    function($scope, gnaviAPIservice, ngTableParams) {

    var model = {
      catCountList:[]
    };

    var tableSlice = function(data, params){

      return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
    };


    var xFunction = function(){
        return function(d) {
            return d.category_l_name;
        }
    };

    var yFunction = function(){
        return function(d) {
            return d.count;
        }
    };

    var descriptionFunction = function(){
        return function(d){
            return d.category_l_name;
        }
    };

    var xAxisTickFormatFunction = function(){
        return function(d){
          // console.log("d");
          // console.log(d);
          return d3.time.format('%b')(new Date(d));
        }
    };



    var initialize = function () {

      console.log("catsController initialize");

      gnaviAPIservice.getCountByCat().success(function (response) {

        angular.extend(model.catCountList, response);

        var tableParams = 
          new ngTableParams({
              page: 1,            // show first page
              count:10           // count per page
          }, {
              total: model.catCountList.length, // length of data
              getData: function($defer, params) {
                  $defer.resolve(tableSlice(model.catCountList, params));
              }
          });

        angular.extend($scope, {
          model: model,
          tableParams: tableParams,
          xAxisTickFormatFunction: xAxisTickFormatFunction,
          xFunction: xFunction,
          yFunction: yFunction,
          descriptionFunction: descriptionFunction

        });
      });

    };

    initialize();
  }]);