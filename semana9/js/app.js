(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',foundItemsDirective)
.constant('MenuServicePath', "https://davids-restaurant.herokuapp.com/");

function foundItemsDirective(){
	var ddo = {
		templateUrl: 'directives/foundItems.html',
		scope:{
			items: '<',
			myTitle: '@title',
			onRemove: '&'
		},
		controller: foundItemsDirectiveController,
		controllerAs: 'foundList',
		bindToController: true,
		link: foundItemsDirectiveLink,
		transclude: true
	};

	return ddo;
}

function foundItemsDirectiveLink(scope,element,attrs,controller){
	console.log("Link scope is: ", scope);
	console.log("Controller instance is: ", controller);
	console.log("Element is: ", element);

	scope.$watch('foundList.displayAlert()',function(displayAlert){
		if (displayAlert === true){
			displayNothingFoundAlert();
		}else{
			removeNothingFoundAlert();
		}	
	});

	

	function displayNothingFoundAlert(){
		console.log('Including alert!');
		var alertElement = element.find("div.error");
		alertElement.slideDown(900);
	}

	function removeNothingFoundAlert(){
		console.log('Removing alert!');
		var alertElement = element.find("div.error");
		alertElement.slideUp(900);
	}

	
}

function foundItemsDirectiveController(){
	var foundList = this;

	foundList.displayAlert = function(){
		if (foundList.items == null){
			return false;
		}
		if (foundList.items.length > 0){
			return false;
		}else{
			return true;
		}
	}
}

MenuSearchService.$inject = ['$http','MenuServicePath'];
function MenuSearchService($http, MenuServicePath){
	var service = this;
	var foundItems = [];

	service.removeItem = function(itemIndex){
		//console.log('Serviço - Removendo o item:' + itemIndex);
		foundItems.splice(itemIndex,1);
	}

	//private method to prepare the http service promise
	var getAllMenuItemsFromServicePromise = function(){
		var response = $http({
			method: "GET",
			url: (MenuServicePath + 'menu_items.json')
		});

		return response;
	};

	service.getMatchedMenuItems = function(searchTerm){
		var promise = getAllMenuItemsFromServicePromise();
		
		//console.log('Promise:');
		//console.log(promise);

		return promise.then(function (result) {
			
			// process result and only keep items that match
		    foundItems = [];
		    var resultItems = result.data.menu_items;
		    //console.log('Lista completa: ' + resultItems.length);
		    for (var i = 0; (i < resultItems.length); i++){
		    	if (resultItems[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
		    		//console.log('found:')
		    		//console.log(resultItems[i]);
		    		foundItems.push(resultItems[i]);
		    	}
		    	
		    }

		    //console.log('Lista filtrada: ' + foundItems.length);
		    // return processed items
		    return foundItems;

		})
		.catch( function (response){
			console.log('Error connecting to remove service: ');
			console.log(response);
		});
	};
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService){
	var nitCtrl = this;
	nitCtrl.searchTerm = "";
	nitCtrl.found = null;

	nitCtrl.getMatchedMenuItems = function (searchTerm){
		//console.log('Chamando o Serviço...');
		if (searchTerm == ""){
			nitCtrl.found = [];
			return;
		}
		var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
		promise.then(function(result){
			nitCtrl.found = result;
			//console.log('Resolvendo a promessa:');
			//console.log(nitCtrl.found);
			//console.log('Lista filtrada pós serviço: ' + nitCtrl.found.length);
		})
		.catch(function (error) {
	      console.log(error);
	    })
	};

	nitCtrl.removeItem = function (itemIndex){
		//console.log('removendo item: ' + itemIndex);
		MenuSearchService.removeItem(itemIndex);
	}

}

})();
