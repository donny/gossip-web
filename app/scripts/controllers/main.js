'use strict';

angular.module('gossipWebApp')
  .controller('MainCtrl', function ($scope, $cookies, $location, md5) {

    $scope.signInAction = function() {
    	$cookies.userName = $scope.userName;
		$cookies.userHash = md5.createHash($scope.userName || '');
		$cookies.userColor = '#' + $cookies.userHash.substring(0, 6);

    	$location.path('/talk');
    };
    
  });
