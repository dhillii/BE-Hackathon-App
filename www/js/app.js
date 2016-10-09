// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', [
    'ionic',
    'ngRoute',
    'ngAnimate'
]);


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

//Controls initial landing page
app.controller('mainController', function($scope, $http, $location) {
    //Changes the view/page
    $scope.changeview = function(path) {
        $location.path(path).replace();
    }
});


//Switches between pages/views
app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'main.html',
        controller:'landingController'
    }).
    when('/Customize', {
        reloadOnSearch: false,
        templateUrl: 'customize.html',
        controller: 'customizeController'
    }).
    when('/FAQ', {
        templateUrl: 'frequentquestions.html',
        controller: 'FAQController'
    }).
    when('/AboutUs', {
        templateUrl: 'aboutUs.html',
        controller: 'AboutController'
    }).
    otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});

exports = app;
