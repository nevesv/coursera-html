(function(){
'use strict';

var shoppingList2 = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolate",
    quantity: "5"
  },
  {
    name: "Peanut Butter",
    quantity: "3"
  },
  {
    name: "Pepto Bismol",
    quantity: "30"
  }
];

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


function ShoppingListCheckOffService(){
    var service = this;
    console.log('service:',service);
    var toBuyList = shoppingList2;
    var boughtList = [];

    service.getBuyItems = function(){
        return toBuyList;
    };

    service.getBoughtList = function(){
        return boughtList;
    };

    service.buyItem = function(itemIndex){
        console.log('buying item: ', itemIndex);
        boughtList.push(toBuyList[itemIndex]);
        toBuyList.splice(itemIndex, 1);
    };
};

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
    var addItem = this;
    console.log('addItem',addItem);
    addItem.items = ShoppingListCheckOffService.getBuyItems();

    addItem.buyItem = function (itemIndex){
        ShoppingListCheckOffService.buyItem(itemIndex);
    }
};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService){
    var showList = this;
    console.log('showList',showList);
    showList.items = ShoppingListCheckOffService.getBoughtList();
};

})();
