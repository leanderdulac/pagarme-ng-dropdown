/**
 * @author Rafael Violato (http://rviolato.com)
 */
(function(){

	angular.module('pg-ng-dropdown', [])
		.directive('pgNgDropdown', dropdownDirective);

	dropdownDirective.$inject = ['$timeout', '$document'];

	function dropdownDirective($timeout, $document){

		var template = [
			'<div class="pg-dropdown">',
				'<div data-ng-click="dropdownCtrl.toggle()" class="current-selected-option">',
						'<i data-ng-if="dropdownCtrl.image == \'true\'" data-ng-style="{\'background-image\': \'url(\'+(dropdownCtrl.data[dropdownCtrl.currentSelected].image)+\')\'}">',
						'</i>',
						'<span data-ng-bind="dropdownCtrl.data[dropdownCtrl.currentSelected].text">',
						'</span>',
						'<div class="arrow-wrapper">',
							'<div class="arrow"></div>',
						'</div>',
				'</div>',
				'<ul class="dropdown-content">',
					'<li data-ng-click="dropdownCtrl.selectOption($index)" data-ng-repeat="option in dropdownCtrl.data">',
						'<i data-ng-if="dropdownCtrl.image == \'true\'" data-ng-style="{\'background-image\': \'url(\'+(option.image)+\')\'}">',
						'</i>',
						'<span data-ng-bind="option.text">',
						'</span>',
					'</li>',
				'</ul>',
		   '</div>',
		].join('');

		var directive = {

			scope: {
				data: '=options',
				image: '@imageOptions',
				currentSelected: '@selected',
				openedClass: '@',
				selectedClass: '@selectedOptionClass',
			},
			restrict: 'AEC',
			controller: controller,
			controllerAs: 'dropdownCtrl',
			bindToController: true,
			replace: true,
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
			vm.close = close;
			vm.toggle = toggle;

			function selectOption(_index){

				if(_index !== vm.currentSelected){
					
					var _pastSelected = vm.currentSelected;

					_index = parseInt(_index);

					vm.currentSelected = _index;
					vm.data[_index].selected = true;

					delete vm.data[_pastSelected].selected;

					$scope.$broadcast('option-selected', {index: _index, pastIndex: _pastSelected});

				}
				
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

			function close(){

				vm.opened = false;
				$scope.$broadcast('close-dropdown');

			}
			
		}

		function postLink($scope, $element, attrs, ctrl){

			var options;
			var openedClass = 'opened';
			var selectedClass = 'selected';
			var eventId = Math.round(Math.random() * 1000);

			if(ctrl.openedClass){
				var openedClass = ctrl.openedClass;
			}

			if(ctrl.selectedClass){
				var selectedClass = ctrl.selectedClass;
			}
			
			$scope.$on('open-dropdown', open);
			$scope.$on('close-dropdown', close);
			$scope.$on('option-selected', select);
			$scope.$on('$destroy', destroy);

			$element.on('click', function(evt){

				if(ctrl.opened){

					evt.stopPropagation();

				}

			});

			$document.on('click', ctrl.close);

			$timeout(function(){


				options = $element.find('li');
				options.eq(ctrl.currentSelected).addClass(selectedClass);

			});

			function select($evt, data){

				options.eq(data.index).addClass(selectedClass);
				options.eq(data.pastIndex).removeClass(selectedClass);
				
			}

			function open(){

				$element.addClass(openedClass);

			}

			function close(){

				$element.removeClass(openedClass);

			}

			function destroy(){
				
				$document.off('click');

			}

		}

	}
	
})();