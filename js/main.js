/* global angular */
var app = angular.module('KnackApp', ["firebase", "ngRoute"]);

app.config(['$routeProvider', '$controllerProvider',
    function($routeProvider, $controllerProvider) {
        // remember mentioned function for later use
        app.registerCtrl = $controllerProvider.register;
        //your routes
        $routeProvider.when('/', {templateUrl: 'index.html'});
        $routeProvider.when('/signup', {templateUrl: 'partials/signup.html'});
        $routeProvider.when('/signin', {templateUrl: 'partials/signin.html'});
        $routeProvider.otherwise({redirectTo: '/'});
    }
]);

app.controller('MainController', ['$scope', '$location', function ($scope, $location) {
  	//  var dbRef = new Firebase("https://knackio.firebaseio.com");

      if (true) {
          $location.path("/signin");
      }

  }
]);