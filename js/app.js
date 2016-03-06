angular.module('app', 
    ['ngRoute', 
     'app.signIn',
     'app.signUp',
     'app.resetpwd',
     'app.classes',
     'app.tasks',
     'app.profile'])
    .config(function ($routeProvider) {
        $routeProvider.
            when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'}).
            otherwise({redirectTo: '/home'});
    })
    .controller('MainCtrl', function($scope, $rootScope, $location) {
        
        var baseUrl = "https://knackio.firebaseio.com/";
        var dbRef = new Firebase(baseUrl);        

        $rootScope.canSeeClasses = function() {
            return $rootScope.getCurrentUser() === 'Earner' || $rootScope.getCurrentUser() === 'Agency';
        }

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
        $rootScope.getCurrentUser = function() {
            var ref = new Firebase("https://knackio.firebaseio.com/");
        
            var authData = ref.getAuth();
            if (authData == null) return;
            if (authData.uid === "7ec090e1-a64f-438c-ac77-775b7a0240d0") {
                  return "Agency";
              } else if (authData.uid === "a90908a6-8638-4b63-a994-76c2f30e5384") {
                  return "Earner";
              } else if (authData.uid === "b77b8a3b-46fe-49de-bff0-122786a3bf09") {
                  return "Employer";
              }
}
    })
    .controller('HomeCtrl', function () {
        console.log('home controller');

    });