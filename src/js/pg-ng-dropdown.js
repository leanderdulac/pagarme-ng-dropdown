'use strict';
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
				'<div data-ng-click="ctrl.toggle()" class="current-selected-option">',
						'<i data-ng-if="ctrl.image == \'true\'" data-ng-style="{\'background-image\': \'url(\'+(ctrl.data[ctrl.value][ctrl.imageProperty])+\')\'}">',
						'</i>',
						'<span data-ng-bind="ctrl.data[ctrl.value][ctrl.textProperty] || ctrl.value">',
						'</span>',
						'<div class="arrow-wrapper">',
							'<div class="arrow"></div>',
						'</div>',
				'</div>',
				'<ul class="dropdown-content">',
					'<li data-ng-click="ctrl.selectOption($index)" data-ng-repeat="option in ctrl.data" title="{{option[ctrl.textProperty]}}" >',
						'<i data-ng-if="ctrl.image == \'true\'" data-ng-style="{\'background-image\': \'url(\'+(option[ctrl.imageProperty])+\')\'}">',
						'</i>',
						'<span data-ng-bind="option[ctrl.textProperty]">',
						'</span>',
					'</li>',
				'</ul>',
		    '</div>',

		].join('');

		var directive = {

			scope: {
				data: '=options',
				image: '@imageOptions',
				imageProperty: '@',
				value: '@selected',
				name: '@',
				textProperty: '@',
				openedClass: '@',
				selectedClass: '@',
				onchange: '&',
			},
			restrict: 'AEC',
			compile: compile,
			controller: controller,
			controllerAs: 'ctrl',
			bindToController: true,
			replace: true,
			template: template,

		};

		return directive;

		function compile($element, attrs){

			attrs.value = attrs.value || 0;
			attrs.textProperty = attrs.textProperty || 'text';
			attrs.imageProperty = attrs.imagetProperty || 'image';

			return {
				post: postLink,
			};
			
		}

		function controller($scope){

			var vm = this;

			vm.opened = false;
			vm.currentOption = -1;

			vm.selectOption = selectOption;
			vm.open = open;
			vm.close = close;
			vm.toggle = toggle;

			if((typeof vm.value) === 'number'){

				vm.data[vm.value].selected = true;

			}

			function selectOption(_index){

				if(_index !== parseInt(vm.value)){
					
					var _pastSelected = vm.value;

					_index = parseInt(_index);

					vm.value = _index;
					vm.data[_index].selected = true;

					if(vm.data[_pastSelected]){

						vm.data[_pastSelected].selected = null;

					}

					vm.onchange();

					$scope.$broadcast('pg-option-selected', {index: _index, pastIndex: _pastSelected});

				}
				
			}

			function toggle(){

				if(vm.opened){

					vm.opened = false;
					$scope.$broadcast('pg-close-dropdown');

				}else{

					vm.opened = true;
					$scope.$broadcast('pg-open-dropdown');

				}

			}

			function open(){
				
				vm.opened = true;
				$scope.$broadcast('pg-open-dropdown');

			}

			function close(){

				vm.opened = false;
				$scope.$broadcast('pg-close-dropdown');

			}
			
		}

		function postLink($scope, $element, attrs, ctrl){

			var options;
			var openedClass = 'opened';
			var selectedClass = 'selected';

			if(ctrl.openedClass){
				var openedClass = ctrl.openedClass;
			}

			if(ctrl.selectedClass){
				var selectedClass = ctrl.selectedClass;
			}
			
			var $open = $scope.$on('pg-open-dropdown', open);
			var $close = $scope.$on('pg-close-dropdown', close);
			var $openThis = $scope.$on('pg-dropdown-open', openEvt);
			var $closeThis = $scope.$on('pg-dropdown-close', closeEvt);
			var $selectThis = $scope.$on('pg-select-option', selectEvt);
			var $select = $scope.$on('pg-option-selected', function($evt, data){

				select($evt, data);
				ctrl.close();

			});

			$element.on('click', elementClick);
			$document.on('click', ctrl.close);
			$element.on('keydown', keydown);
			$scope.$on('$destroy', destroy);

			//init
			$timeout(function(){

				options = $element.find('li');
				options.eq(ctrl.value).addClass(selectedClass);

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
				if(ctrl.currentOption > 0){

					options.eq(ctrl.currentOption).removeClass('focused');
					ctrl.currentOption = -1;

				}

			}

			function elementClick(evt){

				evt.stopPropagation();

			}

			function selectEvt($evt, data){

				if(ctrl.name === data.name){

					$scope.$apply(function(){

						ctrl.selectOption(data.index);

					});

				}
				
			}

			function openEvt($evt, data){

				if(ctrl.name === data.name){

					ctrl.open();

				}
				
			}

			function closeEvt($evt, data){

				if(ctrl.name === data.name){

					ctrl.close();

				}
				
			}

			function keydown(evt){

				var _code = evt.keyCode || evt.which;

				if(_code === 13) { //enter

					if(!ctrl.opened){

						ctrl.open();

					}else if(ctrl.opened && ctrl.currentOption != -1 && ctrl.currentOption != ctrl.value){

						$scope.$apply(function(){

							ctrl.selectOption(ctrl.currentOption);

						});

					}

				}else if(_code === 27){ //esc

					if(ctrl.opened){

						ctrl.close();

					}

				}else if(_code === 38){ //up

					if(ctrl.currentOption-1 >= 0){

						options.eq(ctrl.currentOption).removeClass('focused');
						ctrl.currentOption--;
						options.eq(ctrl.currentOption).addClass('focused');

					}

				}else if(_code === 40){ //down

					if(ctrl.currentOption+1 < options.length){

						options.eq(ctrl.currentOption).removeClass('focused');
						ctrl.currentOption++;
						options.eq(ctrl.currentOption).addClass('focused');

					}

				}
				
			}

			function destroy(){
				
				$document.off('click');
				$open();
				$close();
				$select();
				$closeThis();
				$openThis();
				$selectThis();

			}

		}

	}
	
})();