'use strict';

angular.module('gossipWebApp')
  .controller('TalkCtrl', function ($scope, $cookies) {
  	$scope.socketConnection = null;
  	$scope.data = {};
  	$scope.data.text = "";
  	$scope.data.lines = [];
  	$scope.userName = $cookies.userName;

  	$scope.appendText = function(text) {
  		var texts = text.split(":::");
  		$scope.data.lines.push({title: texts[0], content: texts[1]});
  		$scope.$digest();
  	};

  	$scope.appendInfo = function(text) {
  		$scope.data.lines.push({title: 'Info', content: text});
  	};

    $scope.textAction = function() {
    	if ($scope.socketConnection === null) {
    		$scope.appendInfo("Your browser does not support WebSockets.");
    	} else {
	    	var text = $scope.userName + ':::' + $scope.data.text;
	    	$scope.socketConnection.send(text);
    	}

    	$scope.data.text = "";
    };

  	$scope.prepareWebSocket = function() {
		if (window["WebSocket"]) {
	        $scope.socketConnection = new WebSocket("ws://localhost:8080/ws");
	        $scope.socketConnection.onclose = function(evt) {
	            $scope.appendInfo("Connection closed.");
	        };
	        $scope.socketConnection.onmessage = function(evt) {
	            $scope.appendText(evt.data);
	        };
	    } else {
	        $scope.appendInfo("Your browser does not support WebSockets.");
	    }
  	};

  	$scope.prepareWebSocket();

  });
