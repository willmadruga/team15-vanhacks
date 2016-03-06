angular.module('app.resetpwd', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/resetpwd', {
		templateUrl: 'partials/resetpwd.html', 
		controller: 'ResetPwdCtrl'
	})
  
}])
.controller('ResetPwdCtrl', ['$scope', function ($scope) {
	var dbRef = new Firebase("https://knackio.firebaseio.com");	

	$scope.doneResettingPassword = false;

	$scope.isLoggedIn = function() {
	  return dbRef.getAuth() != null;
	}

	$scope.logoutUser = function() {
	  console.log("Logging out")
	  dbRef.unauth();
	}

	$scope.resetPassword = function(resetPasswordData) {
		// TODO make sure password1 and password2 are same
		dbRef.changePassword({
		  email       : resetPasswordData.email,
		  oldPassword : resetPasswordData.oldPassword,
		  newPassword : resetPasswordData.newPassword1
		}, function(error) {
		  if (error === null) {
		    console.log("Password changed successfully");
		    $scope.resetPasswordMessage = "Password changed successfully";

		  } else {
		    console.log("Error changing password:", error);
		    $scope.resetPasswordMessage = "Error changing password";
		  }
		  $scope.doneResettingPassword = true;
		  $scope.resetPasswordData = {};
		  $scope.$apply();
		});

	}
  }
]);