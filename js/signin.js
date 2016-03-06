angular.module('app.signIn', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/signin', {
		templateUrl: 'partials/signin.html', 
		controller: 'SignInCtrl'
	})
  
}])
.controller('SignInCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
	
	var baseUrl = "https://knackio.firebaseio.com/";
	var dbRef = new Firebase(baseUrl);
	
	var loadCurrentUserProfile = function() {
        console.log('hello current user');
        var authData = dbRef.getAuth();
        var usersDb = new Firebase(baseUrl + "users/" + authData.uid);
        
        usersDb.once("value", function(snapshot) {
        	$rootScope.getCurrentUser = snapshot.val().profile;
        	console.log("Current user 1: ", $rootScope.getCurrentUser);
        });
    }

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
	  		loadCurrentUserProfile();
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