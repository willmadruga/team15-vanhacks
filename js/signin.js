angular.module('app.signIn', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/signin', {
		templateUrl: 'partials/signin.html', 
		controller: 'SignInCtrl'
	})
  
}])
.controller('SignInCtrl', ['$scope', '$location', function ($scope, $location) {
	var dbRef = new Firebase("https://knackio.firebaseio.com");	
	$scope.loginUser = function(loginUserData) {
		dbRef.authWithPassword({
			email    : loginUserData.email,
			password : loginUserData.password
		}, function(error, authData) {
			remember : 'sessionOnly'
			if (error) {
				console.log("Login Failed!", error);
	      		// TODO popup login failed
	      		alert(error);
	  		} else {
	  			console.log("Authenticated successfully with payload:", authData);
	  		}
	  		$scope.loginUserData = {};
	  		$location.path('/profile');
	  		$location.replace();
	  		$scope.$apply();

		});
	}

	$scope.sendPassword = function(loginUserData) {
		dbRef.resetPassword({
			email : loginUserData.email
		}, function(error) {
			if (error) {
				console.log("Error sending password reset email:", error);
	        	// TODO popup
	    	} else {
	    		console.log("Password reset email sent successfully");
		    }	
		    $scope.loginUserData = {};
		    $scope.$apply();
		});
	}
}]);