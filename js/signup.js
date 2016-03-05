angular.module('app.signUp', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/signup', {
		templateUrl: 'partials/signup.html', 
		controller: 'SignUpCtrl'
	})
  
}])

.controller('SignUpCtrl', function($scope) {
		console.log("signup ctrl");
	
var dbRef = new Firebase("https://knackio.firebaseio.com");

      $scope.submitting = false;

      $scope.createUserData = {};

      $scope.alertMessage = '';

      $scope.message = '';

      $scope.createUser = function (createUserData) {
        if (createUserData.confirmPassword == createUserData.password && !$scope.submitting) {

          $scope.submitting = true;
          console.log(" password is the same as password");
          dbRef.createUser({
            email: createUserData.email,
            password: createUserData.password
          }, function(error, userData) {
            if (error) {
              console.log("done loading - error");
              $scope.alertMessage = "Error creating user";
              $scope.message = "";
             
            } else {
              
              $scope.alertMessage = "";
              $scope.message = "Successfully created user";
              
              console.log("done loading - success");
            }

            $scope.submitting = false;
            $scope.$apply();
          });

        } else {
          console.log("confirm password is not the same as password");
          $scope.alertMessage = "Confirm password is not the same as password";
          $scope.message = "";
        }
      }
  });