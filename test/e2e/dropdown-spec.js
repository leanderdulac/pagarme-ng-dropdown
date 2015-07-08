var Dropdown = function(){

	this.openedClass = 'opened';
	this.optionsRepeater = 'option in ctrl.data';
	this.dropdowns = element.all(by.css('.pg-dropdown'));
	
};

describe('Dropdown Spec', function(){

	var elements = new Dropdown();

	beforeEach(function(){

		browser.get('/');
		
	});

	it('should have dropdowns on index.html', hasDropdowns);
	it('should have options inside a dropdown', hasOptions);
	it('should focus dropdown on tab key press', tabFocus);
	it('should open dropdown on click', clickOpen);
	it('should open dropdown on enter key press', enterKeyOpen);

	function hasDropdowns(){

		elements.dropdowns.then(function(dropdowns){

			expect(dropdowns.length).toBeGreaterThan(0);
			
		});
		
	}

	function hasOptions(){

		elements.dropdowns.then(function(dropdowns){

			dropdowns[0].all(by.repeater(elements.optionsRepeater)).then(function(options){

				expect(options.length).toBeGreaterThan(0);
				
			});
			
		});
		
	}

	function clickOpen(){

		_openClickDropdown(0, function(dropdown){

			expect(dropdown.getAttribute('class')).toMatch(elements.openedClass);
			
		});
		
	}


	function enterKeyOpen(){

		_openEnterDropdown(function(dropdown){

			expect(dropdown.getAttribute('class')).toMatch(elements.openedClass);
			
		});
		
	}


	function tabFocus(){

		elements.dropdowns.then(function(dropdowns){

			var _dropdown = dropdowns[0];

			browser.actions().sendKeys(protractor.Key.TAB).perform().then(function(){

				browser.driver.switchTo().activeElement()
				.getAttribute('class').then(function(focusedClasses){

					expect(_dropdown.getAttribute('class')).toMatch(focusedClasses);
					
				});
				
			});
			
		});
		
	}

	function _openEnterDropdown(callback){

		browser.actions().sendKeys(protractor.Key.TAB).perform().then(function(){

			var _focused = browser.driver.switchTo().activeElement();

			browser.actions().sendKeys(protractor.Key.ENTER).perform().then(function(){

				callback(_focused);
				
			});
			
		});	
		
	}	

	function _openClickDropdown(index, callback){

		elements.dropdowns.then(function(dropdowns){

			var _dropdown = dropdowns[index];

			_dropdown.click().then(function(){

				callback(_dropdown);
				
			});
			
		});
		
	}


});