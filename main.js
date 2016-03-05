/* global angular */
angular
	.module('KnackApp', ["firebase"])
  .controller('MainController', ['$scope', function ($scope) {
  	 var dbRef = new Firebase("https://knackio.firebaseio.com");


  }
]);