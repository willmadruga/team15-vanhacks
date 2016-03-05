angular.module('website', ['ngRoute']).
    config(function ($routeProvider) {
        $routeProvider.
            when('/signin', {templateUrl: 'partials/signin.html', controller: 'SignInCtrl'}).
            when('/signup', {templateUrl: 'partials/signup.html', controller: 'SignUpCtrl'}).
            when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'}).
            otherwise({redirectTo: '/home'});
    })
    .controller('SignInCtrl', function ($scope, $location, StateService) {
        $scope.title = 'About Page';
        $scope.body = 'This is the about page body';

        $scope.message = StateService.getMessage();

        $scope.updateMessage = function (m) {
            StateService.setMessage(m);
        };

        $scope.signUp = function() {
            alert('need to redirect to signup page');
            console.log('need to redirect to signup page');
            // $location.path("/signup");
        }
    })
    .controller('SignUpCtrl', function ($scope, StateService, ExperimentsService) {
        $scope.title = 'Experiments Page';
        $scope.body = 'This is the about experiments body';

        $scope.message = StateService.getMessage();
        $scope.experiments = ExperimentsService.getExperiments();

        $scope.updateMessage = function (m) {
            StateService.setMessage(m);
        };
    })
    .controller('HomeCtrl', function ($rootScope, $scope, StateService) {

        if ($rootScope.loggedIn = null) {
            console.log('need to redirect to signin page.');
        }

        $scope.title = 'Home Page';
        $scope.body = 'This is the about home body';

        $scope.message = StateService.getMessage();

        $scope.updateMessage = function (m) {
            StateService.setMessage(m);
        };
    })
    .factory('StateService', function () {
        var message = 'Hello Message';
        var getMessage = function () {
            return message;
        };
        var setMessage = function (m) {
            message = m;
        };

        return {
            getMessage: getMessage,
            setMessage: setMessage
        }
    })
    .service('ExperimentsService', function () {
        var service = this,
            experiments = [
                {name: 'Experiment 1', description: 'This is an experiment', completed:0},
                {name: 'Experiment 2', description: 'This is an experiment', completed:0},
                {name: 'Experiment 3', description: 'This is an experiment', completed:0},
                {name: 'Experiment 4', description: 'This is an experiment', completed:0}
            ];

        service.getExperiments = function() {
            return experiments;
        };
    })
    .directive('experiment', function(){
        var linker = function (scope, element, attrs) {
            element.on('click', function(){
                scope.doExperiment();
            })
        };

        var controller =  function($scope){
            $scope.doExperiment = function() {
                $scope.$apply(function(){
                    $scope.experiment.completed++;
                });
            };
        };

        return {
            scope: true,
            restrict: 'E',
            template: '<div class="experiment">' +
                '<h3>{{experiment.name}}</h3>' +
                '<p>{{experiment.description}}</p>' +
                '<p><strong>{{experiment.completed}}</strong></p>' +
                '</div>',
            link: linker,
            controller: controller
        }
    });