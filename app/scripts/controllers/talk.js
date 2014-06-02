'use strict';

angular.module('gossipWebApp')
  .controller('TalkCtrl', function ($scope, $cookies) {
  	$scope.socketConnection = null;
  	$scope.data = {};
  	$scope.data.text = "";
  	$scope.data.lines = [];
  	$scope.userName = $cookies.userName;
    $scope.userColor = $cookies.userColor;

  	$scope.appendTextData = function(textData) {
      var data = JSON.parse(textData);
      $scope.data.lines.push({title: data.Name, style: {color: data.Color}, content: data.Text});
  		$scope.$digest(); // Because we are called from outside Angular (WebSocket.onmessage)
  	};

  	$scope.appendInfo = function(text) {
  		$scope.data.lines.push({title: 'Info', content: text});
  	};

    $scope.textAction = function() {
    	if ($scope.socketConnection === null) {
    		$scope.appendInfo("Your browser does not support WebSockets.");
    	} else {
        var data = {};
        data.Name = $scope.userName;
        data.Color = $scope.userColor;
        data.Text = $scope.data.text;
	    	$scope.socketConnection.send(JSON.stringify(data));
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
	            $scope.appendTextData(evt.data);
	        };
	    } else {
	        $scope.appendInfo("Your browser does not support WebSockets.");
	    }
  	};

  	$scope.prepareWebSocket();

  });
