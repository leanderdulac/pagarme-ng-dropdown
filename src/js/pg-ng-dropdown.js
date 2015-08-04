'use strict';
/**
 * @author Rafael Violato (http://rviolato.com)
 */

(function(){

	angular.module('pg-ng-dropdown', [])
		.directive('pgNgDropdown', dropdownDirective);

	dropdownDirective.$inject = ['$timeout', '$document', '$parse'];

	function dropdownDirective($timeout, $document, $parse){

		var template = [

			'<div class="pg-dropdown" data-ng-class="{\'disabled\': disabled()}">',
				'<div data-ng-click="toggle()" class="current-selected-option">',
						'<i data-ng-if="image == \'true\'" data-ng-style="{\'background-image\': \'url(\'+(data[selectedOption][imageProperty])+\')\'}">',
						'</i>',
						'<span data-ng-bind="data[selectedOption][textProperty] || emptyText">',
						'</span>',
						'<div class="arrow-wrapper">',
							'<div class="arrow ss-icon ss-standard ss-navigatedown"></div>',
						'</div>',
						'<div style="clear:both;"></div>',
				'</div>',
				'<ul class="dropdown-content">',
					'<li data-ng-click="selectOption($index)" data-ng-repeat="option in data" title="{{option[textProperty]}}" >',
						'<i data-ng-if="image == \'true\'" data-ng-style="{\'background-image\': \'url(\'+(option[imageProperty])+\')\'}">',
						'</i>',
						'<span data-ng-bind="option[textProperty]">',
						'</span>',
						'<div style="clear:both;"></div>',
					'</li>',
				'</ul>',
		    '</div>',

		].join('');

		var directive = {

			scope: {
				
				data: '=options',
				model: '=',
				image: '@imageOptions',
				emptyText: '@',
				name: '@',
				imageProperty: '@',
				textProperty: '@',
				valueProperty: '@',
				openedClass: '@',
				selectedClass: '@',
				dynamicHeight: '@',
				disabled: '&',
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

			attrs.textProperty = attrs.textProperty || 'text';
			attrs.imageProperty = attrs.imageProperty || 'image';
			attrs.valueProperty = attrs.valueProperty || 'value';

			return {
				post: postLink,
			};
			
		}

		function controller($scope){

			$scope.opened = false;
			$scope.currentOption = -1;
			$scope.selectedOption;

			$scope.selectOption = selectOption;
			$scope.open = open;
			$scope.close = close;
			$scope.toggle = toggle;

			if($scope.disabled() === 'undefined'){

				$scope.disabled = function(){

					return false;
					
				};

			}

			$scope.$watch('data', function(){

				$scope.$broadcast('options-changed');

			});

			if($scope.model){

				$scope.data.forEach(function(opt, i){

					if(opt[$scope.valueProperty] == $scope.model){

						$scope.selectedOption = i;

					}
					
				});

			}
			
			function selectOption(_index){

				if(_index !== parseInt($scope.selectedOption)){

					var _pastSelected = $scope.selectedOption;

					_index = parseInt(_index);

					$scope.selectedOption = _index;

					$scope.model = $scope.data[$scope.selectedOption][$scope.valueProperty];

					$scope.onchange();

					$scope.$broadcast('pg-option-selected', {index: _index, pastIndex: _pastSelected});

				}
				
			}

			function toggle(){

				if($scope.opened){

					$scope.opened = false;
					$scope.$broadcast('pg-close-dropdown');

				}else if(!$scope.disabled()){

					$scope.opened = true;
					$scope.$broadcast('pg-open-dropdown');

				}

			}

			function open(){
				
				if(!$scope.disabled()){

					$scope.opened = true;
					$scope.$broadcast('pg-open-dropdown');

				}

			}

			function close(){

				$scope.opened = false;
				$scope.$broadcast('pg-close-dropdown');

			}
			
		}

		function postLink($scope, $element, attrs){

			var optionsWrapper;
			var options;
			var optionHeight;
			var closedHeight;
			var openedHeight;
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
			var $optionsChanged = $scope.$on('pg-options-changed', measureHeight);
			var $select = $scope.$on('pg-option-selected', function($evt, data){

				select($evt, data);
				$scope.close();

			});

			$element.on('click', elementClick);
			$document.on('click', $scope.close);
			$element.on('keydown', keydown);
			$scope.$on('$destroy', destroy);

			//init
			$timeout(function(){

				optionsWrapper = $element.find('ul');
				options = optionsWrapper.find('li');
				options.eq($scope.selectedOption).addClass(selectedClass);

				optionHeight = options.eq(0).prop('offsetHeight');

				if($scope.dynamicHeight){

					measureHeight();

				}

			});

			function select($evt, data){

				options.eq(data.index).addClass(selectedClass);
				options.eq(data.pastIndex).removeClass(selectedClass);
				
			}

			function open(){

				$element.addClass(openedClass);

				if($scope.dynamicHeight){
					$element.css('height', (openedHeight) + 'px');
				}

			}

			function close(){

				$element.removeClass(openedClass);

				if($scope.currentOption > 0){

					options.eq($scope.currentOption).removeClass('focused');
					$scope.currentOption = -1;

				}

				if($scope.dynamicHeight){

					$element.css('height', (closedHeight) + 'px');

				}

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

			function keydown(evt){

				var _code = evt.keyCode || evt.which;

				if(_code === 13) { //enter

					evt.preventDefault();

					if(!$scope.opened){

						$scope.open();

					}else if($scope.opened && $scope.currentOption != -1 && $scope.currentOption != $scope.selectedOption){

						$scope.$apply(function(){

							$scope.selectOption($scope.currentOption);

						});

					}

				}else if(_code === 27){ //esc

					evt.preventDefault();

					if($scope.opened){

						$scope.close();

					}

				}else if(_code === 38){ //up

					evt.preventDefault();

					if($scope.currentOption-1 >= 0){

						options.eq($scope.currentOption).removeClass('focused');
						$scope.currentOption--;
						options.eq($scope.currentOption).addClass('focused');

						if($scope.currentOption < options.length){

							optionsWrapper[0].scrollTop -= optionHeight;

						}

					}

				}else if(_code === 40){ //down

					evt.preventDefault();

					if($scope.currentOption+1 < options.length){

						options.eq($scope.currentOption).removeClass('focused');
						$scope.currentOption++;
						options.eq($scope.currentOption).addClass('focused');
						
						if($scope.currentOption > 1){

							optionsWrapper[0].scrollTop += optionHeight;

						}

					}

				}
				
			}

			function measureHeight(){

				var _style = window.getComputedStyle(optionsWrapper[0]);
				var _padding = parseInt(_style.paddingTop) + parseInt(_style.paddingBottom);
				var _margin = parseInt(_style.marginTop) + parseInt(_style.marginBottom);

				closedHeight = $element.prop('offsetHeight');
				openedHeight = (optionHeight * options.length) + closedHeight + _padding + _margin;
				
			}

			function destroy(){
				
				$document.off('click');
				$open();
				$close();
				$select();
				$optionsChanged();
				$closeThis();
				$openThis();
				$selectThis();

			}

		}

	}
	
})();
