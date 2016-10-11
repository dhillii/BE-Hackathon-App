'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('myApp', [
    'ionic',
    'ui.router',
    'UserApp',
    'ionic.native'
]);

app.factory('idscanAPI', ['$http',
    function($http) {
        return {

            //API from IDSCAN to parse ID barcodes
            analyzeURL: function(image, callback) {
                $http({
                    method: 'GET',
                    url:  'https://app1.idware.net/DriverLicenseParserRest.svc/ParseImage',
                    headers: {
                       'Content-Type': 'text/json',
                       'Cache-Control': 'no-cache'
                    },
                    data: {
                       "authKey": 'cd8594f1-df5f-4296-a155-92a977682923',
                       "data": image
                    },
                }).then(function successCallback(result) {
                    // this callback will be called asynchronously
                    // when the response is available
                    callback(result);

                })
            }

        
    }
}]);

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
app.controller('mainCtrl', function($scope, $http, $location ) {
    //Sidenav Functions
    $scope.navOpen = false;
    $scope.clickedNav = function(){
        $scope.navOpen = !$scope.navOpen;
        console.log($scope.navOpen);
    }
});

app.controller('loginCtrl', function($scope, $http, $location) {
    //Changes the view/page
    $scope.changeview = function(path) {
        $location.path(path).replace();
    }
    console.log('login controller active.')
});

app.controller('signupCtrl', function($scope, $http, $location, $cordovaCamera,  $ionicPlatform) {
    //Changes the view/page
    $scope.changeview = function(path) {
        $location.path(path).replace();
    }
    
    $scope.DATA = "Upload a Picture"
    $scope.license;

    // wait for ondeviceready, or use $ionicPlatform.ready() if you're using Ionic Framework 1
    $scope.takePicture = function() {
      // now we can call any of the functionality as documented in Native docs
      $cordovaCamera.getPicture().then(
        function(res) {
          console.log("We have taken a picture!", res);
          $scope.license = res;
          idscanAPI.analyzeURL(res, function(data) {
                console.log(data);
            })
          $scope.DATA = "PICTURE UPLOADED!!"
          
        },
        function(err){
          console.error("Error taking a picture", err);
          $scope.DATA = "Error!"
        }
      );
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

