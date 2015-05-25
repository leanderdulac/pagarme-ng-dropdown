# [pg-ng-dropdown](https://github.com/rfviolato/pg-ng-dropdown)

*Pagar.me directive to provide a simple and quick dropdown*

#### Installation

Import the directive file into your project:
```
<script src="pg-ng-dropdown.js"></script>
```

Load the pg-ng-dropdown module:
```
angular.module('myApp', ['pg-ng-dropdown']);
```


Call the directive in an element via attribute, class or tag name:
```
<div data-pg-ng-dropdown></div>
```


Pass the data via attribute:
```
<div data-pg-ng-dropdown data-options="myOptionsArray"></div>
```

#### Directive Optionals

Choose initial selected option:
```
<div data-pg-ng-dropdown data-selected="3" data-options="myOptionsArray"></div>
```

Enable image options:
```
<div data-pg-ng-dropdown image-options="true" data-options="myOptionsArray"></div>
```

#### Array expected format

The options array must contains one JSON for each option. Each object must contain 'text' property for the text content and if image option is enabled it must contain 'image' property with the url.

Example:
```
var myOptionArray = [
		{
			text: 'Carl Sagan',
			image: 'img/carl.png',
		},
		{
			text: 'Stephen Hawking',
			image: 'img/stephen.png',
		},
		{
			text: 'Michio Kaku',
			image: 'img/michio.png',
		},
];
```

And that's it :D

Rafael Violato @ pagar.me
