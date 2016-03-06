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

  $scope.addClass = function(classData) {
    console.log(classData);
    console.log(classData.classDate);
    $scope.classes.$add({
      title: classData.title,
      description: classData.description,
      classDate: classData.classDate.toString(),
      classTime: classData.classTime.toString(),
      dateTime: classData.classDateTime.toString()
    }).then(function(ref) {
        console.log("Added a class");
        var classId = ref.key();
        ref.child("id").set(classId);
        console.log(classId);
    });
    $scope.classData = {};

  }

  $scope.activateClass = function(classObject) {
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

