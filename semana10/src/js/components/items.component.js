angular.module('MenuApp')
.component('items',{
	templateUrl: '/html/components/items.component.html',
	bindings:{
		menuItems: '<',
		myTitle:'@title',
		onRemove: '&'
	}
});