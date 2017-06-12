(function(){
'user strict';

angular.module('MenuApp')
.controller('ItemsListController',ItemsListController);

ItemsListController.$Inject = ['menuItems'];
function ItemsListController (menuItems){
	var itemsList = this;
	console.log('ItemsListController:', itemsList);
	itemsList.menuItems = menuItems;
	
	var cancel = itemList.$oninit(){
		console.log('oninit');	
	}
})();
