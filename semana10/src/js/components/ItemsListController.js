(function(){
'user strict';

angular.module('MenuApp')
.controller('ItemsListController',ItemsListController);

ItemsListController.$Inject = ['MenuDataService', 'menuItems'];
function ItemsListController (MenuDataService, menuItems){
	var itemsList = this;
	itemsList.menuItems = menuItems;
}
})();