(function(){
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateParams','$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateParams, $stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/html/templates/home.template.html'
  })

  .state('categories', {
  	url:'/menu-categories',
  	templateUrl:'src/html/templates/categories-list.template.html',
  	controller: 'CategoriesListController as categoriesList',
  	resolve: {
  		items: ['MenuDataService', function(MenuDataService){
  			return MenuDataService.getAllCategories();
  		}]
  	}

  .state('items',{
  	url:'/items/{selectedItem}',
  	templateUrl: 'str/html/templates/items-list.template.html',
  	controller: 'ItemsListController as itemsList',
  	resolve:{
  		menuItems: ['$stateParams','MenuDataService', function($stateParams, MenuDataService){
  			return MenuDataService.getItemsForCategory($stateParams.selectedItem.short_name);
  		}]
  	}
  })

  });

}

})();
