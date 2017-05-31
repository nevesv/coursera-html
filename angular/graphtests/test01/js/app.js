(function(){
'use strict'

var app = angular.module('myApp',["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider
    .when("/", {
        templateUrl : "pages/main.html"
    })
    .when("/collapsable", {
        templateUrl : "pages/collapsable.html"
    })
    .when("/graphs", {
        templateUrl : "pages/graphs.html"
    });
});

app.controller('myCrtl', myCtrl);

function myCtrl (){

}

})();