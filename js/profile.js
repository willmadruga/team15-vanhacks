angular.module('app.profile', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/profile', {
		templateUrl: 'partials/profile.html', 
		controller: 'ProfileCtrl'
	})
  
}])

.controller('ProfileCtrl', function($scope) {

	$scope.editProfile = function() {
		
		if ($scope.isEditing == undefined) {
			$scope.isEditing = false;
		}

		$scope.isEditing = !$scope.isEditing;
		console.log('Edit mode is: ' + $scope.isEditing);	
	}

	if ($scope.profile == undefined) {
		console.log('loading profile');
		loadProfile($scope);	
	}
	
});

var loadProfile = function($scope) {
	var baseUrl = "https://knackio.firebaseio.com/users/";
	var ref = new Firebase(baseUrl);
	var authData = ref.getAuth();
	var userRef = new Firebase(baseUrl + authData.uid);
	
	userRef.once("value", function(snapshot) {
		$scope.profile = snapshot.val();
		console.log($scope.profile);
		$scope.$apply();
	});
}