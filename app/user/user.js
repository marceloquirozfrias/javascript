'use strict';

app.service('UserSvc', ['$http', 'AppConfig', function($http, AppConfig) {
	this.getAll = function() {
		return $http.get(AppConfig.url+"/crud/users?token="+AppConfig.sessionId);
	}

	this.insert = function(item) {
		return $http.post(AppConfig.url+"/crud/user?sessionId="+AppConfig.sessionId, item);
	}

	this.update = function(item) {
		return $http.put(AppConfig.url+"/crud/user?sessionId="+AppConfig.sessionId, item);
	}

	this.remove = function(item) {
		return $http.delete(AppConfig.url+"/crud/user?sessionId="+AppConfig.sessionId+"&pk="+item.pkStr);
	}

	

}]);



app.controller('UserCtrl', ['$scope', 'AppConfig', 'UserSvc', function($scope, AppConfig, UserSvc) {
	$scope.title = "User page";
	$scope.userList = [];
	$scope.selectedItem = null;
	$scope.editedItem = {};
	$scope.isNew = false;
	$scope.err = false;
	$scope.errMsg = "";
	$scope.domainMap = [];

	

	function getAll() {
		UserSvc.getAll()
		.then(
			function(data) {
				if ((data.data) && (data.data.errorCode == 0)) {
					$scope.userList = data.data.data;
					$scope.err = false;
					$scope.errMsg = "";
					
				} else {
					console.error("Error retrieving data: "+data.data.errorMessage);
					if(data.data.errorCode == 1){
						$scope.err = true;
						$scope.errMsg = "Invalid session";
					} else if(data.data.errorCode == 2){
						$scope.err = true;
						$scope.errMsg = "You don't have the permission to view User page";
					}
				}
			},
			function(data) {

			}
		);
	}

	

	$scope.doNew = function() {
		console.log('New User');
		$scope.editedItem = {};
		
		$scope.isNew = true;
	}

	$scope.post = function() {
		if ($scope.isNew) {
			
			UserSvc.insert($scope.editedItem)
			.then(
				function(data) {
					if ((data.data) && (data.data.errorCode == 0)) {
						$scope.userList.push(data.data.data);
					} else {
						console.error("Error inserting: "+data.data.errorMessage);
						if(data.data.errorCode == 1){
							$scope.err = true;
							$scope.errMsg = "Invalid session";
						} else if(data.data.errorCode == 2){
							$scope.err = true;
							$scope.errMsg = "You don't have the permission to insert";
						}
					}
				}
			);
		} else {
			
			UserSvc.update($scope.editedItem)
			.then(
				function(data) {
					if ((data.data) && (data.data.errorCode == 0)) {
						//$scope.userList.push(data.data.data);
					} else {
						$scope.cancel();
						console.error("Error updating: "+data.data.errorMessage);
						if(data.data.errorCode == 1){
							$scope.err = true;
							$scope.errMsg = "Invalid session";
						} else if(data.data.errorCode == 2){
							$scope.err = true;
							$scope.errMsg = "You don't have the permission to edit";
						}
					}
				},
				function(data){
					$scope.cancel();
				}
			);
		}
	}
	$scope.doRemove = function(item) {
		UserSvc.remove(item)
			.then(
				function(data) {
					if ((data.data) && (data.data.errorCode == 0)) {
						var index = $scope.userList.indexOf(item);
						if (index >= 0) {
							$scope.userList.splice(index, 1);
						}
					} else {
						console.error("Error deleting: "+data.data.errorMessage);
						if(data.data.errorCode == 1){
							$scope.err = true;
							$scope.errMsg = "Invalid session";
						} else if(data.data.errorCode == 2){
							$scope.err = true;
							$scope.errMsg = "You don't have the permission to delete";
						}
					}
				}
			);
	}

	$scope.doEdit = function(item) {
		console.log('Edit User');
		$scope.selectedItem = angular.copy(item);
		$scope.editedItem = item;
		$scope.isNew = false;
	}

	$scope.cancel = function(){
		angular.copy($scope.selectedItem, $scope.editedItem);
	}

	function initialize() {
		getAll();
	}

	initialize();
}]);



