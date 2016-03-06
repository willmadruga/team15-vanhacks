'use-strict';
angular.module('app.classes', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/classes', {
		templateUrl: 'partials/classes.html', 
		controller: 'ClassesCtrl'
	})
  
}])


.controller('ClassesCtrl', function($scope, $firebaseArray) {
  $scope.message = "hello";

  var ref = new Firebase("https://knackio.firebaseio.com/");
  var dbRef = new Firebase("https://knackio.firebaseio.com/classes");
  $scope.classes = $firebaseArray(dbRef);
  $scope.activeClass = null;

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



  $scope.addClass = function(classData) {
    console.log(classData);
    console.log(classData.classDate);

    badges = [];

     angular.forEach($scope.badges, function(value, key) {
        console.log(key + ': ' + value);
        if (value.quantity > 0) {
          badges.push(value);
        }
      });

 // Converting the date and time to string
      classData.classDate.setHours(classData.classTime.getHours());
      classData.classDate.setMinutes(classData.classTime.getMinutes());
      classData.classDate.setSeconds(classData.classTime.getSeconds());

    $scope.classes.$add({
      title: classData.title,
      description: classData.description,
      classDate: classData.classDate.toString(),
      badges: badges
    }).then(function(ref) {
        console.log("Added a class");
        var classId = ref.key();
        ref.child("id").set(classId);
        console.log(classId);
    });
    $scope.classData = {};

  }

  $scope.activateClass = function(classObject, id) {
    if ($scope.classes[id].open == true) {
        $scope.classes[id].open = false; 
      } else {
        $scope.classes[id].open = true;
      }

    console.log(classObject);
    $scope.activeClass = classObject;
    console.log("Activating class");

    var currentStudentId = ref.getAuth().uid;
    var currentClassRef = dbRef.child($scope.activeClass.id);
    var participantsRef = currentClassRef.child("participants");
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

          var userRef = ref.child("users").child(participantId);
          console.log("user ref:", userRef.toString());
          userRef.on("value", function (snap) {
            $scope.participants.push(snap.val());
            console.log(snap.val().firstName);
          });

        }
      });
  }

  $scope.canJoinClass = function () {
    // console.log("Checking if a student can join class");
    if (ref.getAuth() == null) return false;
    if ($scope.activeClass == null) return false;
    var currentStudentId = ref.getAuth().uid;
    var currentClassRef = dbRef.child($scope.activeClass.id);
    var participantsRef = currentClassRef.child("participants");
    var participants = $firebaseArray(participantsRef);

    participants.$loaded()
      .then(function() {
        // console.log("Loaded participants:", participants);
        $scope.currentStudentIsAlreadyEnrolled = false;
        for(var i = 0; i < participants.length; i++) {
          var key = participants.$keyAt(i);
          var record = participants.$getRecord(key);
          var participantId = record.$value;
          if (participantId === currentStudentId) {
            $scope.currentStudentIsAlreadyEnrolled = true;
            // console.log("Current student already joined the workshop:", $scope.currentStudentIsAlreadyEnrolled);
          }
        }
    });

    var canJoinClass = $scope.$parent.getCurrentUser() === 'Earner' &&
        $scope.activeClass != null &&
        !$scope.currentStudentIsAlreadyEnrolled;
    return canJoinClass;
  }

  $scope.goToProfile = function (argument) {
    // body...
    console.log("going to students profile");
  }
  
  $scope.joinClass = function () {
    var currentStudentId = ref.getAuth().uid;
    var currentClassId = $scope.activeClass.id;
    var currentClassRef = dbRef.child(currentClassId);
    $scope.participants = $firebaseArray(currentClassRef.child("participants"));

    $scope.participants.$add(currentStudentId).then(function(ref){
      console.log("Added student:", currentStudentId);
    });
  } 

  $scope.populateBadges = function() {
    var dbRef = new Firebase("https://knackio.firebaseio.com/badges");
    $scope.badges = $firebaseArray(dbRef);

    var images = [
    {
      title: "badges_time-management",
      imagePath: "images/softskill-badges_time-management.jpg"
    },
    ];

    for (var i = 0; i < images.length; i++) {
      $scope.badges.$add({
        title: images[i].title,
        imagePath: images[i].imagePath,
      }).then(function(ref){
        var imageId = ref.key();
        ref.child("id").set(imageId);
        console.log("Added a badge");
      });
    }
  }



});

