var app = angular.module('IlsDapp');

app.controller("MainController", function ($scope, Accounts) {
    $scope.accounts = Accounts.list();

    IlsContract.deployed().then(function(contract) {
        $scope.contract_address = contract.address;
        $scope.contract_abi = JSON.stringify(contract.contract.abi);
        $scope.$apply();
    });

});