angular.module('app.profile', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/profile', {
		templateUrl: 'partials/profile.html', 
		controller: 'ProfileCtrl'
	})
  
}])

.controller('ProfileCtrl', function($scope) {
	console.log('profile controller.');

	var ref = new Firebase("https://knackio.firebaseio.com/users");

	var authData = ref.getAuth();
	console.log('querying profile data for user > ' + authData.uid);
	
	var userRef = new Firebase("https://knackio.firebaseio.com/users/" + authData.uid);
	
	userRef.once("value", function(snapshot) {
		$scope.profile = {
			username : snapshot.val().username,
			firstName : snapshot.val().firstName,
			lastName : snapshot.val().lastName
		};
		console.log($scope.profile);
		$scope.$apply();
	});

	$scope.edit = function(v) {
		if (v===0) {
			$scope.isEditing = false; 
		} else {
			$scope.isEditing = true; 
		}
	}

});