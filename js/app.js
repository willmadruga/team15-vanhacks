angular.module('app', 
    ['ngRoute', 
     'app.signIn',
     'app.signUp',
     'app.resetpwd',
     'app.tasks',
     'app.profile'])
    .config(function ($routeProvider) {
        $routeProvider.
            when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'}).
            otherwise({redirectTo: '/home'});
    })
    .controller('MainCtrl', function($scope, $rootScope, $location) {
        var dbRef = new Firebase("https://knackio.firebaseio.com"); 

        $rootScope.isLoggedIn = function() {
            return dbRef.getAuth() != null;
        }

        $rootScope.logoutUser = function() {
            
            console.log("Logging out")
            dbRef.unauth();

            $location.path("/home");
            $location.replace();
            $scope.$apply();

        }
    })
    .controller('HomeCtrl', function () {
        console.log('home controller');

    });