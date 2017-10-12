var app = angular.module('IlsDapp');

app.controller("MainController", function ($scope, Accounts) {
    $scope.accounts = Accounts.list();
    $scope.account = $scope.accounts[0];

    IlsContract.deployed().then(function(contract) {
        $scope.contract_address = contract.address;
        $scope.contract_abi = JSON.stringify(contract.contract.abi);
        $scope.$apply();
    });

    $scope.selectAccount = function(account) {
    	$scope.account=account;
  	}   

});