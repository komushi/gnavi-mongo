angular.module('gnaviApp').

  /* Prefs controller */
  controller('catsController', function($scope, gnaviAPIservice, ngTableParams) {

    var model = {
      catCountList:[]
    };

    var getRest = function(catCode, callback) {
        return gnaviAPIservice.getRestByCat(catCode).then(
          function(data) {

            
            return callback(data);
          }
        );

    };

    var getRestCount = function(catList, callback){
        var prom = [];
        var catCountList = [];

        catList.forEach(function (obj, i) {
            prom.push(getRest(obj.category_l_code, function(data){
                var jsonObj = angular.fromJson(
                    '{"category_l_name":"' + obj.category_l_name + 
                    '","category_l_code":"' + obj.category_l_code + 
                    '","count":' + data.total_hit_count + '}');

                catCountList.push(jsonObj);
            }));
        });

        $q.all(prom).then(function () {
            callback(catCountList);
        });
    };

    var tableSlice = function(data, params){

      return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
    };

    var initData = function (data) {
      

      getRestCount(data, function (catCountList) {
        
        angular.extend(model.catCountList, catCountList);

        angular.extend($scope, {
          model: model
         });

      });
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



    angular.extend($scope, {
      
      xAxisTickFormatFunction: xAxisTickFormatFunction,
      xFunction: xFunction,
      yFunction: yFunction,
      descriptionFunction: descriptionFunction

    });

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

        initData(data);

        angular.extend($scope, {
          tableParams: tableParams
        });
    });    

  });