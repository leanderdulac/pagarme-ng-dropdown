/**
 * @author Rafael Violato (http://rviolato.com)
 */
(function(){

	angular.module('pg-ng-dropdown', [])
		.directive('pgNgDropdown', dropdownDirective);

	function dropdownDirective(){

		var template = '<div class="pg-dropdown">' +
							'<div class="current-selected-option">' +
									'<i data-ng-if="image === \'true\'">' +
									'</i>' +
									'<span data-ng-bind="data[currentSelected].text">' +
									'</span>' +
							'</div>' +
							'<ul class="dropdown-content">' +
								'<li data-ng-repeat="option in data">' +
									'<i data-ng-if="image === \'true\'">' +
									'</i>' +
									'<span data-ng-bind="option.text">' +
									'</span>' +
								'</li>' +
							'</ul>' +
					   '</div>';

		var directive = {
			scope: {
				data: '=options',
				image: '@imageOptions',
				currentSelected: '=selected',
			},
			restrict: 'AEC',
			controller: controller,
			controllerAs: 'dropdownCtrl',
			link: postLink,
			template: template,
		};

		return directive;

		function controller($scope){

			var self = this;

			if($scope.currentSelected){

				$scope.currentSelected = 0;
				
			}
			
		}

		function postLink(){
			
		}

	}
	
})();