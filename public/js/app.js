angular.module('pg-ng-dropdown-demo', ['pg-ng-dropdown'])
.controller('test', function($scope){

	var a = 0;
	var b = 1;

	$scope.testDisabled = function(){

		return a !== b;
		
	};
	
});