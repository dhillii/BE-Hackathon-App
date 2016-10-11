'use strict';
import { Camera } from 'ionic-native';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('myApp', [
    'ionic',
    'ui.router',
    'UserApp',
]);

app.run(function($ionicPlatform, user) {
  // Initiate the user service with your UserApp App Id
  // https://help.userapp.io/customer/portal/articles/1322336-how-do-i-find-my-app-id-
  user.init({ appId: '57fb721ea09a7' });

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
app.controller('mainCtrl', function($scope, $http, $location) {
    //Changes the view/page
    $scope.changeview = function(path) {
        $location.path(path).replace();
    }
});

app.controller('loginCtrl', function($scope, $http, $location) {
    //Changes the view/page
    $scope.changeview = function(path) {
        $location.path(path).replace();
    }
    console.log('login controller active.')
});

app.controller('signupCtrl', function($scope, $http, $location) {
    //Changes the view/page
    $scope.changeview = function(path) {
        $location.path(path).replace();
    }

});


//Switches between pages/views
app.config(function($stateProvider, $urlRouterProvider) {
    // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
    $urlRouterProvider

    // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
    .otherwise('/');
    
    $stateProvider
    .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: "loginCtrl",
        data: { login: true },
    })
    .state('main', {
        url: "/",
        templateUrl: "views/main.html",
        controller: "mainCtrl",
    })
    .state('signup', {
        url: "/signup",
        templateUrl: "views/signup.html",
        controller: "signupCtrl",
        data: { public: true },
    })

});


app.config(['$locationProvider', function ($locationProvider) {
			$locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });
		}
]);

exports = app;

