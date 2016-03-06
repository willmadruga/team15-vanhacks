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

	console.log('profile>>> ' + ref.getAuth());
	

});