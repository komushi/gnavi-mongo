angular.module('gnaviApp').

  /* Prefs controller */
  controller('areasCatsController', function($scope, gnaviAPIservice, ngTableParams) {

    var model = {
      chartData:[]
    };

    var catList = [];
    var areaList = [];

    var getRest = function(areaCode, catCode, callback) {
        return gnaviAPIservice.getRestByAreaCat(areaCode, catCode).then(
          function(data) {
            return callback(data);
          }
        );

    };


    var getRestCount = function(areaCode, catList, callback){
      var prom = [];
      var valueList = [];

      catList.forEach(function (obj, i) {
        if (obj.$selected)
        {
          prom.push(getRest(areaCode, obj.category_l_code, function(data){
              var jsonObj = angular.fromJson(
                '["' + obj.category_l_name + 
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

    var pushChartData = function () {
      gnaviAPIservice.getCountByAreaCat(areaList, catList).success(function(response) {
        
        var series = {
          key:{},
          values:[]
        }

        angular.extend(series, {
          key: areaObj.area_name,
          values: response
        });

        model.chartData.push(series);
        console.info("model.chartData");
        console.log(JSON.stringify(model.chartData));
      });
    };

    // var pushChartData = function (areaObj) {
    //   getRestCount(areaObj.area_code, catList, function (valueList) {

    //     var series = {
    //       key:{},
    //       values:[]
    //     }

    //     angular.extend(series, {
    //       key: areaObj.area_name,
    //       values: valueList
    //     });

    //     model.chartData.push(series);
    //     console.info("model.chartData");
    //     console.log(JSON.stringify(model.chartData));
    //   });
    // };

    var xAxisTickFormatFunction = function(){
        return function(d){
          return d;
        }
    };

    var changeSelectionArea = function(data, selected) {
        console.info("selected area:");
        console.info(data);

        console.info("catList:");
        console.info(catList);

        console.info("areaList:");
        console.info(areaList);
        
        // console.info("selected");
        // console.info(selected);


        if (selected)
        {
          pushChartData();
        }
        else
        {
          model.chartData.forEach(function (obj, i) {
            if (obj.key === data.area_name)
            {
              model.chartData.splice(i, 1);
              return;
            }

          });          
        }



    };

    var changeSelectionCat = function(data, selected) {
        console.info("data");
        console.info(data);
        // console.info("selected");
        // console.info(selected);

        console.info("model.chartData");
        console.log(JSON.stringify(model.chartData));


    };

    var initialize = function () {
      gnaviAPIservice.getGnaviAreas().success(function(response) {
        
          areaList = response.area;

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

      gnaviAPIservice.getGnaviCats().success(function(response) {
        
        catList = response.category_l;
        catList.forEach(function (obj, i) {
          obj.$selected = true;
        });


        // angular.extend(model.catList, data);

        var tableParams = 
          new ngTableParams({
              page: 1,            // show first page
              count:10           // count per page
          }, {
              total: catList.length, // length of data
              getData: function($defer, params) {
                  $defer.resolve(tableSlice(catList, params));
              }
          });

        angular.extend($scope, {
          tableCatParams: tableParams
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