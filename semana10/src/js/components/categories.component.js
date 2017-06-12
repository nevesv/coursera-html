angular.module('MenuApp')
.component('categories', {
	templateUrl: 'src/html/components/categories.component.html',
	controller: "CategoriesController as catCtrl",
	bindings:{
		categoryItems: '<',
		myTitle:'@title',
		onRemove: '&'
	}
});

