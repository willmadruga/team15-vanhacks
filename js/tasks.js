angular.module('app.tasks', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/tasks', {
		templateUrl: 'partials/tasks.html', 
		controller: 'TasksCtrl'
	})
  

}])


.controller('TasksCtrl', function($scope, $firebaseArray) {
		console.log("tasks");
   
    var ref = new Firebase("https://knackio.firebaseio.com/");
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
        url: "images/Basic-Food-Service.jpg",
        quantity: 0
      },
      {
        id: "id2",
        name: "badge2",
        description: "Badge 2",
        url: "images/Cooking-Methods.jpg",
        quantity: 0
      },
      {
        id: "id3",
        name: "badge3",
        description: "Badge 3",
        url: "images/Storage.jpg",
        quantity: 0
      },
      {
        id: "id4",
        name: "badge4",
        description: "Badge 4",
        url: "images/softskill-badges_computer-literacy.jpg",
        quantity: 0
      },
      {
        id: "id5",
        name: "badge5",
        description: "Badge 5",
        url: "images/softskill-badges_conflict-resolution.jpg",
        quantity: 0
      },      
      {
        id: "id6",
        name: "badge6",
        description: "Badge 6",
        url: "images/softskill-badges_teamwork.jpg",
        quantity: 0
      },
      {
        id: "id7",
        name: "badge7",
        description: "Badge 7",
        url: "images/softskill-badges_time-management.jpg",
        quantity: 0
      }, 
      {
        id: "id8",
        name: "badge8",
        description: "Badge 8",
        url: "images/softskill-badges_workplace-communication.jpg",
        quantity: 0
      },

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


    // List of Tasks
    $scope.openTask = function(id, task) {
      console.log("clicked");
      if ($scope.tasks[id].open == true) {
        $scope.tasks[id].open = false; 
      } else {
        $scope.tasks[id].open = true;
      }

      if ($scope.tasks[id].open == true) {
       console.log(task);
        
        console.log("Activating class");

        var currentStudentId = ref.getAuth().uid;
        var currentTasksRef = dbRef.child(task.$id);
        var participantsRef = currentTasksRef.child("participants");
        console.log(participantsRef.toString());
        var participants = $firebaseArray(participantsRef); 
        $scope.participants = [];

        participants.$loaded()
        .then(function () {
          var ids = [];
          for(var i = 0; i < participants.length; i++) {
            var key = participants.$keyAt(i);
            var record = participants.$getRecord(key);
            var participantId = record.$value;
            ids.push(participantId);
            console.log(participants);

            var userRef = ref.child("users").child(participantId);
            
            userRef.on("value", function (snap) {
              $scope.participants.push(snap.val());
              console.log(snap.val().firstName);
            });

          }

        });
      }

    };


    $scope.apply = function(task) {

      console.log("apply");
      
      var currentStudentId = ref.getAuth().uid;

      var currentTaskId = task.$id;
      var currentTaskRef = dbRef.child(currentTaskId);
      $scope.participants = $firebaseArray(currentTaskRef.child("participants"));

      $scope.participants.$add(currentStudentId).then(function(ref){
        console.log("Added student:", currentStudentId);
      });
      
    }

});

