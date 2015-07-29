var app =  angular.module('gnaviApp', [
  'gnaviApp.services',
  'ngRoute',
  'ngTable',
  'nvd3ChartDirectives'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.
		when("/", {redirectTo: '/prefs'}).
		when("/prefs", {templateUrl: "views/prefs.html", controller: "prefsController"}).
		when("/areas", {templateUrl: "views/areas.html", controller: "areasController"}).
		when("/cats", {templateUrl: "views/cats.html", controller: "catsController"}).
		when("/areasCats", {templateUrl: "views/areasCats.html", controller: "areasCatsController"}).
		when("/catsAreas", {templateUrl: "views/catsAreas.html", controller: "catsAreasController"}).
		otherwise({redirectTo: '/'});
}]);
