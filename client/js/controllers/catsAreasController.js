angular.module('gnaviApp').

  /* Prefs controller */
  controller('catsAreasController', function($scope, gnaviAPIservice, ngTableParams) {

    var model = {
      chartData:[]
    };

    var areaList = [];

    var getRest = function(areaCode, catCode, callback) {
        return gnaviAPIservice.getRestByAreaCat(areaCode, catCode).then(
          function(data) {
            return callback(data);
          }
        );

    };


    var getRestCount = function(catCode, areaList, callback){
      var prom = [];
      var valueList = [];

      areaList.forEach(function (obj, i) {
        if (obj.$selected)
        {
          prom.push(getRest(obj.area_code, catCode, function(data){
              var jsonObj = angular.fromJson(
                '["' + obj.area_name + 
                '",' + data.total_hit_count + ']');

              valueList.push(jsonObj);
          }));
        }
      });

      $q.all(prom).then(function () {
          callback(valueList);
      });
    };

    var tableSlice = function(data, params){
      return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
    };


    var pushChartData = function (catObj) {
      getRestCount(catObj.category_l_code, $scope.tableAreaParams.data, function (valueList) {

        var series = {
          key:{},
          values:[]
        }

        angular.extend(series, {
          key: catObj.category_l_name,
          values: valueList
        });

        model.chartData.push(series);
      });
    };

    var xAxisTickFormatFunction = function(){
        return function(d){
          return d;
        }
    };

    var changeSelectionArea = function(data, selected) {
        // console.info("data");
        // console.info(data);
        // console.log("selected");
        // console.info(selected);

        // console.log(model.chartData);

        // if (selected)
        // {
        //   pushChartData(data);
        // }
        // else
        // {
        //   model.chartData.forEach(function (obj, i) {
        //     if (obj.key === data.area_name)
        //     {
        //       model.chartData.splice(i, 1);
        //       return;
        //     }

        //   });          
        // }
    };

    var changeSelectionCat = function(data, selected) {

        if (selected)
        {
          pushChartData(data);
        }
        else
        {
          model.chartData.forEach(function (obj, i) {
            if (obj.key === data.category_l_name)
            {
              model.chartData.splice(i, 1);
              return;
            }

          });          
        }
    };

    var initialize = function () {
      gnaviAPIservice.getCats().then(function(response) {
        
        var data = response.category_l;

        var tableParams = 
          new ngTableParams({
              page: 1,            // show first page
              count:10           // count per page
          }, {
              total: data.length, // length of data
              getData: function($defer, params) {
                  $defer.resolve(tableSlice(data, params));
              }
          });

        angular.extend($scope, {
          tableCatParams: tableParams
        });

      });

      gnaviAPIservice.getAreas().then(function(response) {
        
          // var data = response.area;
          areaList = response.area;
          areaList.forEach(function (obj, i) {
            obj.$selected = true;
          });

          var tableParams = 
            new ngTableParams({
                page: 1,            // show first page
                count:10           // count per page
            }, {
                total: areaList.length, // length of data
                getData: function($defer, params) {
                    $defer.resolve(tableSlice(areaList, params));
                }
            });

          angular.extend($scope, {
            tableAreaParams: tableParams
          });
      });


      angular.extend($scope, {
        model: model,
        pushChartData: pushChartData,
        changeSelectionArea: changeSelectionArea,
        changeSelectionCat: changeSelectionCat
      });

    };

    initialize();

  });