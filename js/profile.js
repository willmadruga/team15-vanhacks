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
	
	ref.orderByKey().on("child_added", function(snapshot) {
  		console.log(snapshot.key());
	});

	$scope.profileData = {

	}

});