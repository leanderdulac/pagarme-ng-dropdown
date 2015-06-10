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
				textProperty: '@',
				openedClass: '@',
				selectedClass: '@',
				onchange: '&',
			},
			restrict: 'AEC',
			controller: controller,
			controllerAs: 'ctrl',
			bindToController: true,
			replace: true,
			link: postLink,
			template: template,

		};

		return directive;

		function controller($scope){

			var vm = this;
			vm.opened = false;

			if((typeof vm.value) === 'number'){

				vm.data[vm.value].selected = true;

			}else{

				vm.value = vm.value || 0;

			}

			vm.textProperty = vm.textProperty || 'text';
			vm.imageProperty = vm.imagetProperty || 'image';

			vm.selectOption = selectOption;
			vm.close = close;
			vm.toggle = toggle;

			function selectOption(_index){

				if(_index !== parseInt(vm.value)){
					
					var _pastSelected = vm.value;

					_index = parseInt(_index);

					vm.value = _index;
					vm.data[_index].selected = true;

					if(vm.data[_pastSelected]){

						delete vm.data[_pastSelected].selected;

					}

					vm.onchange();

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
			$scope.$on('option-selected', ctrl.close);
			$scope.$on('$destroy', destroy);

			$element.on('click', elementClick);
			$document.on('click', ctrl.close);

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

			}

			function elementClick(evt){

				evt.stopPropagation();

			}

			function destroy(){
				
				$document.off('click');

			}

		}

	}
	
})();