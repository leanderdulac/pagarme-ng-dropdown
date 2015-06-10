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
							'<div class="arrow ss-icon ss-standard ss-navigatedown"></div>',
						'</div>',
				'</div>',
				'<ul class="dropdown-content">',
					'<li data-ng-click="selectOption($index)" data-ng-repeat="option in data" title="{{option[textProperty]}}" >',
						'<i data-ng-if="image == \'true\'" data-ng-style="{\'background-image\': \'url(\'+(option[imageProperty])+\')\'}">',
						'</i>',
<<<<<<< HEAD
						'<span data-ng-bind="option[textProperty]">',
=======
						'<span data-ng-bind="option[textProperty]" data-t="{{option[textProperty]}}" data-tt="{{option}}" data-ttt="{{textProperty}}">',
>>>>>>> pagarme
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
			compile: compile,
			controller: controller,
			replace: true,
			template: template,

		};

		return directive;

		function compile($element, attrs){

<<<<<<< HEAD
			$scope.opened = false;

			if((typeof $scope.value) === 'number'){

				$scope.data[$scope.value].selected = true;

			}else{

				$scope.value = $scope.value || 0;
=======
			attrs.value = attrs.value || 0;
			attrs.textProperty = attrs.textProperty || 'text';
			attrs.imageProperty = attrs.imagetProperty || 'image';

			return{
				post: postLink,
			};
			
		}

		function controller($scope){
>>>>>>> pagarme

			$scope.opened = false;

<<<<<<< HEAD
			$scope.textProperty = $scope.textProperty || 'text';
			$scope.imageProperty = $scope.imagetProperty || 'image';

			$scope.selectOption = selectOption;
			$scope.close = close;
			$scope.toggle = toggle;
=======
			$scope.selectOption = selectOption;
			$scope.close = close;
			$scope.toggle = toggle;

			if((typeof $scope.value) === 'number'){

				$scope.data[$scope.value].selected = true;

			}
>>>>>>> pagarme

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

			function close(){

				$scope.opened = false;
				$scope.$broadcast('close-dropdown');

			}
			
		}

		function postLink($scope, $element, attrs){

			var options;
			var openedClass = 'opened';
			var selectedClass = 'selected';
			var eventId = Math.round(Math.random() * 1000);

			if($scope.openedClass){
				var openedClass = $scope.openedClass;
			}

			if($scope.selectedClass){
				var selectedClass = $scope.selectedClass;
			}
			
			$scope.$on('open-dropdown', open);
			$scope.$on('close-dropdown', close);
			$scope.$on('option-selected', select);
			$scope.$on('option-selected', $scope.close);
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

			function destroy(){
				
				$document.off('click');

			}

		}

	}
	
})();