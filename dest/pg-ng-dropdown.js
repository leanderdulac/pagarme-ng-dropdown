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
						'<i data-ng-if="image == \'true\'" data-ng-style="{\'background-image\': \'url(\'+(data[currentSelected].image)+\')\'}">',
						'</i>',
						'<span data-ng-bind="data[currentSelected].text">',
						'</span>',
						'<div class="arrow-wrapper">',
							'<div class="arrow"></div>',
						'</div>',
				'</div>',
				'<ul class="dropdown-content">',
					'<li data-ng-click="selectOption($index)" data-ng-repeat="option in data" title="{{option.text}}" >',
						'<i data-ng-if="image == \'true\'" data-ng-style="{\'background-image\': \'url(\'+(option.image)+\')\'}">',
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
				onchange: '&',
			},
			restrict: 'AEC',
			controller: controller,
			replace: true,
			link: postLink,
			template: template,

		};

		return directive;

		function controller($scope){

			$scope.opened = false;

			if(!$scope.currentSelected){

				$scope.currentSelected = 0;

			}

			$scope.data[$scope.currentSelected].selected = true;

			$scope.selectOption = selectOption;
			$scope.close = close;
			$scope.toggle = toggle;

			function selectOption(_index){

				if(_index !== parseInt($scope.currentSelected)){
					
					var _pastSelected = $scope.currentSelected;

					_index = parseInt(_index);

					$scope.currentSelected = _index;
					$scope.data[_index].selected = true;

					delete $scope.data[_pastSelected].selected;

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
				options.eq($scope.currentSelected).addClass(selectedClass);

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