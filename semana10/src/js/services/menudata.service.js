(function(){
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http','ApiBasePath'];
function MenuDataService($http, ApiBasePath){
	var service = this;


	service.getAllCategories = function(){
		//https://davids-restaurant.herokuapp.com/categories.json
		var response = $http({
			method: "GET",
			url: (ApiBasePath + "/categories.json")
		});

		return response;

	};

	service.getItemsForCategory = function(categoryShortName){
		console.log('categoryShortName: ', categoryShortName);
		var response = $http({
			method:"GET",
			url: (ApiBasePath + "/menu_items.json"),
			params: {
				category: categoryShortName
			}
		});

		return response;
	};

}

})();
