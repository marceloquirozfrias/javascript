var app = angular.module('app', ['ngRoute']);



app.service('AppConfig', function(){
    this.url = 'http://localhost:3000',
    this.sessionId='',
  


    this.getSessionId = function(){
        return this.sessionId;
    }

    this.setSessionId = function(val){
        this.sessionId = val;
    }

    this.isUserLogged = function(){
       
        return this.sessionId != "";
    }
});



app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    'use strict';
    $routeProvider.
        when('/', {
            templateUrl: 'app/main.html',
            controller: 'MainCtrl'
        }).

		when('/Product', {
            templateUrl: 'app/product/Product.tpl.html',
            controller: 'ProductCtrl'
        }).
		   
		when('/User', {
            templateUrl: 'app/user/User.tpl.html',
            controller: 'UserCtrl'
        }).


        when('/Login', {
            templateUrl: 'app/login/Login.html',
            controller: 'LoginCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
}]).run(['AppConfig', '$rootScope', '$location', function (AppConfig,$rootScope, $location){
   $rootScope.$on( "$routeChangeStart", function(event, next, current) {
       if ( next.templateUrl !== "app/login/Login.html") {
        //Check user´s login
            if(AppConfig.getSessionId == null){
                console.log("User not logged in. Redirecting");
              $location.path("/Login");
            }
            else{
                if(AppConfig.isUserLogged()){

                }else{
                    console.log("User not logged in. Redirecting");
                    $location.path("/Login");
                }
               
            }
        }

    });
}]);



app.controller('MainCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    'use strict';
	$scope.title = 'This is a title !';
}]);
