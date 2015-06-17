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
				'<div data-ng-click="toggle()" class="current-selected-option">',
						'<i data-ng-if="image == \'true\'" data-ng-style="{\'background-image\': \'url(\'+(data[value][imageProperty])+\')\'}">',
						'</i>',
						'<span data-ng-bind="data[value][textProperty] || value">',
						'</span>',
						'<div class="arrow-wrapper">',
							'<div class="arrow "></div>',
						'</div>',
				'</div>',
				'<ul class="dropdown-content">',
					'<li data-ng-click="selectOption($index)" data-ng-repeat="option in data" title="{{option[textProperty]}}" >',
						'<i data-ng-if="image == \'true\'" data-ng-style="{\'background-image\': \'url(\'+(option[imageProperty])+\')\'}">',
						'</i>',
						'<span data-ng-bind="option[textProperty]">',
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
			replace: true,
			template: template,

		};

		return directive;

		function compile($element, attrs){

			attrs.value = attrs.value || 0;
			attrs.textProperty = attrs.textProperty || 'text';
			attrs.imageProperty = attrs.imagetProperty || 'image';

			return{
				post: postLink,
			};
			
		}

		function controller($scope){

			$scope.opened = false;

			$scope.selectOption = selectOption;
			$scope.open = open;
			$scope.close = close;
			$scope.toggle = toggle;

			if((typeof $scope.value) === 'number'){

				$scope.data[$scope.value].selected = true;

			}

			function selectOption(_index){

				if(_index !== parseInt($scope.value)){
					
					var _pastSelected = $scope.value;

					_index = parseInt(_index);

					$scope.value = _index;
					$scope.data[_index].selected = true;

					if($scope.data[_pastSelected]){

						delete $scope.data[_pastSelected].selected;

					}

					$scope.onchange();

					$scope.$broadcast('option-selected', {index: _index, pastIndex: _pastSelected});

				}
				
			}

			function toggle(){

				if($scope.opened){

					$scope.opened = false;
					$scope.$broadcast('close-dropdown');

				}else{

					$scope.opened = true;
					$scope.$broadcast('open-dropdown');

				}

			}

			function open(){
				
				$scope.opened = true;
				$scope.$broadcast('pg-open-dropdown');

			}

			function close(){

				$scope.opened = false;
				$scope.$broadcast('close-dropdown');

			}
			
		}

		function postLink($scope, $element, attrs){

			var options;
			var openedClass = 'opened';
			var selectedClass = 'selected';

			if($scope.openedClass){
				var openedClass = $scope.openedClass;
			}

			if($scope.selectedClass){
				var selectedClass = $scope.selectedClass;
			}
			
			var $open = $scope.$on('pg-open-dropdown', open);
			var $close = $scope.$on('pg-close-dropdown', close);
			var $openThis = $scope.$on('pg-dropdown-open', openEvt);
			var $closeThis = $scope.$on('pg-dropdown-close', closeEvt);
			var $selectThis = $scope.$on('pg-select-option', selectEvt);
			var $select = $scope.$on('pg-option-selected', function($evt, data){

				select($evt, data);
				$scope.close();

			});

			$scope.$on('$destroy', destroy);
			$element.on('click', elementClick);
			$document.on('click', $scope.close);

			//init
			$timeout(function(){

				options = $element.find('li');
				options.eq($scope.value).addClass(selectedClass);

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

			function selectEvt($evt, data){

				if($scope.name === data.name){

					$scope.$apply(function(){

						$scope.selectOption(data.index);

					});

				}
				
			}

			function openEvt($evt, data){

				if($scope.name === data.name){

					$scope.open();

				}
				
			}

			function closeEvt($evt, data){

				if($scope.name === data.name){

					$scope.close();

				}
				
			}

			function destroy(){
				
				$document.off('click');
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