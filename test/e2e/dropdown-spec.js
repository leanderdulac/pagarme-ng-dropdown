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
	it('should open dropdown on click', clickOpen);

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

	function _openClickDropdown(index, callback){

		elements.dropdowns.then(function(dropdowns){

			var _dropdown = dropdowns[index];

			_dropdown.click().then(function(){

				callback(_dropdown);
				
			});
			
		});
		
	}


});