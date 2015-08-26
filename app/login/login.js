'use strict';



app.service('LoginSvc', ['$http', 'AppConfig', function($http, AppConfig) {

	this.insert = function(item) {
		//return $http.post(AppConfig.url+"login",item);
		return $http.post(AppConfig.url+"/login?username="+item.username+"&password="+item.password);
	}

	//guardar sesion en el service AppConfig
	this.setSes = function(session){
		AppConfig.setSessionId(session);
	}

	this.getSes = function(){
		AppConfig.getSessionId();
	}

}]);



app.controller('LoginCtrl', ['$scope', 'AppConfig', 'LoginSvc', '$location', function($scope, AppConfig, LoginSvc, $location) {
	$scope.title = "Login page";
	$scope.errMsg = "";
	$scope.err = false;
	$scope.loginItem = {username: "", password: ""};


	$scope.post = function() {
		
		LoginSvc.insert($scope.loginItem)
		.then(
			function(data) {
				
				if ((data.data) && (data.data.errorCode == 0)) {
					$scope.err = false;
					$scope.errMsg = "";
					console.log("User logged in");
					//guardar el id de la sesion en AppConfig
					//LoginSvc.setSes(data.data.data.sessionId);
					LoginSvc.setSes(data.data.token);
					$location.path('/');

				} else {
					//mostrar mensaje de error
					$scope.err = true;
					$scope.errMsg = "Wrong user/password. Try again";
					console.error("Failed to log in");
				}
			}
			);



	}

	//Si se cancela se sale de la aplicacion
	$scope.cancel = function(){
		window.location.href="http://www.google.com";
	}

	

}]);