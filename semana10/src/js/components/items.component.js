angular.module('MenuApp')
.component('items',{
	templateUrl: 'src/html/components/items.component.html',
	bindings:{
		menuItems: '<',
		myTitle:'@title',
		onRemove: '&'
	}
});
