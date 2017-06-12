(function(){
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

//CategoriesController.$inject = [];
function CategoriesController (){
	var catCtrl = this;
	console.log(catCtrl);
	//this.title = title;
	//this.categoryItems = categoryItems;
} 

})();