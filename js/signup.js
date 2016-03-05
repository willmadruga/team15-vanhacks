angular.module('app.signUp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/signup', {
		templateUrl: 'partials/signup.html', 
		controller: 'SignUpCtrl'
	})
  
}])

.controller('SignUpCtrl', function() {
	console.log('sign up controller.');
});