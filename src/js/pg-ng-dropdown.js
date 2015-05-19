/**
 * @author Rafael Violato (http://rviolato.com)
 */
(function(){

	angular.module('pg-ng-dropdown', [])
		.directive('pgNgDropdown', dropdownDirective);

	function dropdownDirective(){

		var directive = {
			restrict: 'AEC',
			controller: controller,
			controllerAs: 'dropdownCtrl',
			link: postLink,
		};

		return directive;

		function controller(){
			
		}

		function postLink(){
			
		}

	}
	
})();