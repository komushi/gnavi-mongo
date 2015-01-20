angular.module('gnaviApp').

  /* Prefs controller */
  controller('prefsController', function($scope, gnaviAPIservice, ngTableParams) {

    gnaviAPIservice.getGnaviPrefs().success(function (response) {
        //Digging into the response to get the relevant data
        var data = response.pref;
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count:10           // count per page
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

    });

  });