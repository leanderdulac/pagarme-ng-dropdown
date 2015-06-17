angular.module('pg-ng-dropdown-demo', ['pg-ng-dropdown'])
.controller('test', function($scope){

	window.t = function(){

		$scope.$broadcast('dropdown-open', {
			name: 'genius3'
		});
		
	};

	window.tt = function(){

		$scope.$broadcast('select-option', {
			name: 'genius3',
			index: 0,
		});
		
	};
	
});