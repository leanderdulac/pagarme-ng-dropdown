/**
 * @author Rafael Violato (http://rviolato.com)
 */
(function(){

	angular.module('pg-ng-dropdown', [])
		.directive('pgNgDropdown', dropdownDirective);

	function dropdownDirective(){

		var template = '<div class="pg-dropdown">' +
							'<div data-ng-click="dropdownCtrl.toggle()" class="current-selected-option">' +
									'<i data-ng-if="image === \'true\'">' +
									'</i>' +
									'<span data-ng-bind="dropdownCtrl.data[dropdownCtrl.currentSelected].text">' +
									'</span>' +
							'</div>' +
							'<ul class="dropdown-content">' +
								'<li ng-if="dropdownCtrl.currentSelected != $index" data-ng-click="dropdownCtrl.selectOption($index)" data-ng-repeat="option in dropdownCtrl.data">' +
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
				currentSelected: '@selected',
				openedClass: '@',
			},
			restrict: 'AEC',
			controller: controller,
			controllerAs: 'dropdownCtrl',
			bindToController: true,
			link: postLink,
			template: template,
		};

		return directive;

		function controller($scope){

			var vm = this;
			vm.opened = false;

			if(!vm.currentSelected){

				vm.currentSelected = 0;

			}

			vm.data[vm.currentSelected].selected = true;

			vm.selectOption = selectOption;
			vm.toggle = toggle;

			function selectOption(_index){

				_index = parseInt(_index);

				delete vm.data[vm.currentSelected].selected;
				vm.currentSelected = _index;
				vm.data[_index].selected = true;
				
			}

			function toggle(){

				if(vm.opened){

					vm.opened = false;
					$scope.$broadcast('close-dropdown');

				}else{

					vm.opened = true;
					$scope.$broadcast('open-dropdown');

				}

			}
			
		}

		function postLink($scope, $element, attrs, ctrl){

			if(ctrl.openedClass){
				var openedClass = ctrl.openedClass;
			}else{
				var openedClass = 'opened';
			}
			
			$scope.$on('open-dropdown', open);
			$scope.$on('close-dropdown', close);

			function open(){
				$element.addClass(openedClass);
			}

			function close(){
				$element.removeClass(openedClass);
			}

		}

	}
	
})();