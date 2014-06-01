'use strict';

angular.module('gossipWebApp')
  .controller('MainCtrl', function ($scope, $cookies, $location) {

    $scope.signInAction = function() {
    	$cookies.userName = $scope.userName;
    	$location.path('/talk');
    };
    
  });
