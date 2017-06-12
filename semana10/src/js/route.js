(function(){
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

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
  })
  
  .state('items',{
  	url:'/items/{selectedCategoryId}',
  	templateUrl: 'src/html/templates/categories-item.template.html',
  	controller: 'ItemsListController as itemsList',
  	resolve:{
  		menuItems: ['$stateParams','MenuDataService', function($stateParams, MenuDataService){
  			return MenuDataService.getItemsForCategory($stateParams.selectedCategoryId);
  		}]
  	}
  });

}

})();
