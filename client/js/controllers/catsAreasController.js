angular.module('gnaviApp').

  /* Prefs controller */
  controller('catsAreasController', function($scope, gnaviAPIservice, ngTableParams) {

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

      gnaviAPIservice.getCountByCatArea(jsonParam)
        .success(function(response) {

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

      pushChartData(areaList, catList, true);

    };

    var changeSelectionCat = function(data, selected) {

        if (selected)
        {
          pushChartData(areaList, [data], false);
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
      gnaviAPIservice.getGnaviCats().success(function(response) {
        
        catList = response.category_l;

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

      gnaviAPIservice.getGnaviAreas().success(function(response) {
        
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