# [pg-ng-dropdown](http://pagarme.github.io/pg-ng-dropdown/)
*[Pagar.me](http://pagar.me) directive to provide a simple and quick dropdown from a provided array of options*

<<<<<<< HEAD
## Legacy version
=======
*For angular versions < 1.3 that does not supports* [`bindToController`](https://docs.angularjs.org/api/ng/service/$compile) *, you should see this [branch](https://github.com/pagarme/pg-ng-dropdown/tree/legacy).*
>>>>>>> pagarme

### Check the demo [here](http://pagarme.github.io/pg-ng-dropdown/)

#### Installation

Install via npm package manager:
```
$ npm install pg-ng-dropdown
```

Or via Bower:
```
$ bower install pg-ng-dropdown
```

Import the directive file into your project:
```html
<script src="bower_components/pg-ng-dropdown/dest/pg-ng-dropdown.min.js"></script>
```

Load the pg-ng-dropdown module:
```javscript
angular.module('myApp', ['pg-ng-dropdown']);
```


Call the directive in an element via attribute, class or tag name:
```html
<div data-pg-ng-dropdown></div>
<div class="pg-ng-dropdown"></div>
<pg-ng-dropdown></pg-ng-dropdown>
```


Pass the data via attribute:
```html
<div data-pg-ng-dropdown data-options="myOptionsArray"></div>
```

#### Array expected format

The options array must contains one JSON for each option.

Example:
```javascript
var myOptionArray = [
		{
			text: 'Carl Sagan',
			image: 'img/carl.png' //if image-options is set to true
		},
		{
			text: 'Stephen Hawking',
			image: 'img/stephen.png' //if image-options is set to true
		},
		{
			text: 'Michio Kaku',
			image: 'img/michio.png' //if image-options is set to true
		}
];
```

#### Directive Optionals

You can choose the object property to display the text of the option, instead of the default `text`:

```html
<div data-pg-ng-dropdown data-text-property="diffTextProp" data-options="myOptionsArray"></div>
```

You can do the same to set the image url of the option, instead of the default `image`:

```html
<div data-pg-ng-dropdown data-text-property="diffImageProp" data-options="myOptionsArray"></div>
```

Set the initial display text of the dropdown:
```html
<div data-pg-ng-dropdown data-selected="Choose an option" data-options="myOptionsArray"></div>
```

Or choose initial selected option (default is `0`):
```html
<div data-pg-ng-dropdown data-selected="3" data-options="myOptionsArray"></div>
```

Enable image options (default is `false`):
```html
<div data-pg-ng-dropdown data-image-options="true" data-options="myOptionsArray"></div>
```

Opened dropdown class (default is `opened`):
```html
<div data-pg-ng-dropdown data-opened-class="my-opened-class" data-options="myOptionsArray"></div>
```

Selected option class (default is `selected`):
```html
<div data-pg-ng-dropdown data-selected-class="my-selected-class" data-options="myOptionsArray"></div>
```

Option selected/changed custom function:
```html
<div data-pg-ng-dropdown data-onchange="myFunction" data-options="myOptionsArray"></div>
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

[Rafael Violato](http://rviolato.com) @ [pagar.me](http://pagar.me)
