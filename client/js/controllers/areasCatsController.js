angular.module('gnaviApp').

  /* Prefs controller */
  controller('areasCatsController', function($scope, gnaviAPIservice, ngTableParams) {

    var model = {
      chartData:[]
    };

    var catList = [];
    var areaList = [];

    var tableSlice = function(data, params){
      return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
    };

    var selectedObjList = function (objList) {
          
      var selectedObjList = [];
      
      objList.forEach(function (obj) {
        if (obj.$selected)
        {
          selectedObjList.push(obj);
        }
      });

      return selectedObjList; 
    };

    var pushChartData = function (pAreaList, pCatList, clearFlg) {

      var jsonParam = {areaList: selectedObjList(pAreaList), catList: selectedObjList(pCatList)};

      gnaviAPIservice.getCountByAreaCat(jsonParam)
        .success(function(response) {
          // console.log("response:" + JSON.stringify(response));

          if (clearFlg) 
          {
            angular.extend(model.chartData, response);
          }
          else
          {
            model.chartData.push(response[0]);  
          }
          

        });
    };

    var changeSelectionArea = function(data, selected) {

        if (selected)
        {
          pushChartData([data], catList, false);
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
        
        pushChartData(areaList, catList, true);

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