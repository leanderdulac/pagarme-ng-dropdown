# [pg-ng-dropdown](http://pagarme.github.io/pg-ng-dropdown/)
*[Pagar.me](http://pagar.me) directive to provide a simple and quick dropdown from a provided array of options*

### Check the demo [here](http://pagarme.github.io/pg-ng-dropdown/)

#### Installation

Import the directive file into your project:
```html
<script src="pg-ng-dropdown.js"></script>
```

Load the pg-ng-dropdown module:
```javscript
angular.module('myApp', ['pg-ng-dropdown']);
```


Call the directive in an element via attribute, class or tag name:
```html
<div data-pg-ng-dropdown></div>
```


Pass the data via attribute:
```html
<div data-pg-ng-dropdown data-options="myOptionsArray"></div>
```

#### Directive Optionals

Choose initial selected option:
```html
<div data-pg-ng-dropdown data-selected="3" data-options="myOptionsArray"></div>
```

Enable image options:
```html
<div data-pg-ng-dropdown image-options="true" data-options="myOptionsArray"></div>
```

#### Array expected format

The options array must contains one JSON for each option. Each object must contain `text` property for the text content and if image option is enabled it must contain `image` property with the url.

Example:
```javascript
var myOptionArray = [
		{
			text: 'Carl Sagan',
			image: 'img/carl.png'
		},
		{
			text: 'Stephen Hawking',
			image: 'img/stephen.png'
		},
		{
			text: 'Michio Kaku',
			image: 'img/michio.png'
		}
];
```

#### Retrieving the selected option

The option that is selected will recieve the `selected: true` property.

Example:
```javascript
{
	text: 'Carl Sagan',
	image: 'img/carl.png',
	selected: true
}
```

And that's it :D

Rafael Violato @ pagar.me
