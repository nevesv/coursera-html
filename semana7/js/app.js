(function(){
'use strict';
angular.module('MyAppModule',[])
.controller('MsgController',MsgController);
MsgController.$inject = ['$scope'];
function MsgController($scope){
  $scope.menu = "";
  $scope.message="";
  $scope.messageClass="";
  $scope.texboxMessage="";

  $scope.verifyMenu = function(menu){
    var count = numberOfOptionsWithoutSpace(menu);
    if (count == 0){
      $scope.message = "Please enter data first";
      $scope.messageClass="enterDataMessage";
      $scope.texboxMessage="enterDataTexbox";
    }
    else if (count <= 3){
      $scope.message="Enjoy!";
      $scope.messageClass="successMessage";
      $scope.texboxMessage="successTextbox";
    }else{
      $scope.message="Too much!";
      $scope.messageClass="successMessage";
      $scope.texboxMessage="successTextbox";
    }
  };

  function numberOfOptionsWithoutSpace(menu){
    var splitedMenu = menu.split(',');
    var count = splitedMenu.length;
    var option = "";
    for (var i = 0; i < splitedMenu.length; i++){
      option = splitedMenu[i];
      if (option.trim() == "" ){
        count--;
      }
    }
    return count;
  }
}


})();
