angular.module('app.tasks', ['ngRoute', 'firebase', 'ngDialog'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/tasks', {
		templateUrl: 'partials/tasks.html', 
		controller: 'TasksCtrl'
	})
  
}])


.controller('TasksCtrl', function($scope, ngDialog, $firebaseArray) {
		console.log("tasks");

    var dbRef = new Firebase("https://knackio.firebaseio.com/tasks");
    $scope.tasks = $firebaseArray(dbRef);

    $scope.newTaskData = {};
    $scope.addingNewTask = false;

    // Default Value
    function resetData() {
      $scope.newTaskData.date = new Date();
      $scope.newTaskData.time = new Date(0, 0, 0, 23, 59);
    }

    resetData();

    $scope.addingNewTask = true;
    $scope.canAdd = true;

    $scope.badges = [
      {
        id: "id1",
        name: "badge1",
        description: "Badge 1",
        url: "images/badge1.jpg",
        quantity: 0
      },
      {
        id: "id2",
        name: "badge2",
        description: "Badge 2",
        url: "images/badge2.jpg",
        quantity: 0
      },
      {
        id: "id3",
        name: "badge3",
        description: "Badge 3",
        url: "images/badge3.jpg",
        quantity: 0
      },
      {
        id: "id4",
        name: "badge4",
        description: "Badge 4",
        url: "images/badge4.jpg",
        quantity: 0
      }
    ];

    //$scope.newTaskData.badges = $scope.badges;
    
    $scope.clickToAdd = function () {
      $scope.addingNewTask = !$scope.addingNewTask;
      $scope.canAdd = false;
    };

    $scope.cancelNewTask = function() {
      $scope.addingNewTask = false;
      console.log("cancel task");
    }

    $scope.saveNewTask = function(newTaskData) {
      
      console.log("save task");

      badges = [];

      angular.forEach($scope.badges, function(value, key) {
        console.log(key + ': ' + value);
        if (value.quantity > 0) {
          badges.push(value);
        }
      });

      // Converting the date and time to string
      newTaskData.date.setHours(newTaskData.time.getHours());
      newTaskData.date.setMinutes(newTaskData.time.getMinutes());
      newTaskData.date.setSeconds(newTaskData.time.getSeconds());

      $scope.tasks.$add({
        title: newTaskData.title,
        description: newTaskData.description,
        date: newTaskData.date.toString(),
        badges: badges
      }).then(function(ref) {
        console.log("Added a tasks");
        resetData();
        $scope.addingNewTask = false;
      });

    }

});

