angular.module('app.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/profile', {
		templateUrl: 'partials/profile.html', 
		controller: 'ProfileCtrl'
	})
  
}])

.controller('ProfileCtrl', function() {
	console.log('profile controller.');
});