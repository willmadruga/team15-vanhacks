angular.module('app.signIn', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/signin', {
		templateUrl: 'partials/signin.html', 
		controller: 'SignInCtrl'
	})
  
}])

.controller('SignInCtrl', function() {
	console.log('sign in controller.');
});