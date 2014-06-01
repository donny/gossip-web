'use strict';

angular.module('gossipWebApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/talk', {
        templateUrl: 'views/talk.html',
        controller: 'TalkCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
