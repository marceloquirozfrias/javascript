'use strict';

app.service('ProductSvc', ['$http', 'AppConfig', function($http, AppConfig) {
	this.getAll = function() {
		return $http.get(AppConfig.url+"/crud/products?token="+AppConfig.sessionId);
	}

	this.insert = function(item) {
		return $http.post(AppConfig.url+"/crud/product?token="+AppConfig.sessionId, item);
	}

	this.update = function(item) {
		return $http.put(AppConfig.url+"/crud/product?token="+AppConfig.sessionId, item);
	}

	this.remove = function(item) {
		return $http.delete(AppConfig.url+"/crud/product?token="+AppConfig.sessionId+"&pk="+item.pkStr);
	}

	
}]);

app.controller('ProductCtrl', ['$scope', 'AppConfig', 'ProductSvc', function($scope, AppConfig, ProductSvc) {
	$scope.title = "Product page";
	$scope.productList = [];
	$scope.selectedItem = null;
	$scope.editedItem = {};
	$scope.isNew = false;
	$scope.err = false;
	$scope.errMsg = "";
	$scope.domainMap = [];

	

	function getAll() {
		ProductSvc.getAll()
		.then(
			function(data) {
				if ((data.data) && (data.data.errorCode == 0)) {
					$scope.productList = data.data.data;
					$scope.err = false;
					$scope.errMsg = "";
					
				} else {
					console.error("Error retrieving data: "+data.data.errorMessage);
					if(data.data.errorCode == 1){
						$scope.err = true;
						$scope.errMsg = "Invalid session";
					} else if(data.data.errorCode == 2){
						$scope.err = true;
						$scope.errMsg = "You don't have the permission to view Product page";
					}
				}
			},
			function(data) {

			}
		);
	}

	

	$scope.doNew = function() {
		console.log('New Product');
		$scope.editedItem = {};
		$scope.editedItem.id = 0;
		$scope.isNew = true;
	}

	$scope.post = function() {
		if ($scope.isNew) {
			$scope.editedItem.id = 0;
			ProductSvc.insert($scope.editedItem)
			.then(
				function(data) {
					if ((data.data) && (data.data.errorCode == 0)) {
						$scope.productList.push(data.data.data);
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
			$scope.editedItem.id = $scope.selectedItem.id;
			ProductSvc.update($scope.editedItem)
			.then(
				function(data) {
					if ((data.data) && (data.data.errorCode == 0)) {
						//$scope.productList.push(data.data.data);
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
		ProductSvc.remove(item)
			.then(
				function(data) {
					if ((data.data) && (data.data.errorCode == 0)) {
						var index = $scope.productList.indexOf(item);
						if (index >= 0) {
							$scope.productList.splice(index, 1);
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
		console.log('Edit Product');
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



