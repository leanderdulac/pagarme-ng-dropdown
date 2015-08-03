angular.module('pg-ng-dropdown-demo', ['pg-ng-dropdown'])
.controller('test', function($scope){

	var a = 0;
	var b = 1;

	console.log(a !== b);

	$scope.testDisabled = function(){

		return a !== b;
		
	};

	window.t = function(){

		b = 0;
		
	};
	
});