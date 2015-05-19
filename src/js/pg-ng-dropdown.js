/**
 * @author Rafael Violato (http://rviolato.com)
 */
(function(){

	angular.module('pg-ng-dropdown', [])
		.directive('pgNgDropdown', dropdownDirective);

	function dropdownDirective(){

		var template = '<div class="pg-dropdown">' +
							'<div class="current-selected-option">' +
							'</div>' +
							'<ul class="dropdown-content">' +
								'<li data-ng-repeat="option in data">' +
									'<span data-ng-bind="option.text">' +
									'</span>' +
								'</li>' +
							'</ul>' +
					   '</div>';

		var directive = {
			scope: {
				data: '=options',
			},
			restrict: 'AEC',
			controller: controller,
			controllerAs: 'dropdownCtrl',
			link: postLink,
			template: template,
		};

		return directive;

		function controller($scope){
			
		}

		function postLink(){
			
		}

	}
	
})();