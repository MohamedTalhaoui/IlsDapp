var app = angular.module('IlsDapp');

app.controller('BondsController', function($scope){

  $scope.bonds = [];

  IlsContract.deployed().then(function(contract) {
    contract.BondIssued(null, {fromBlock: 0, toBlock: 'latest'}, function(error, result) {
      $scope.bonds.push(result.args);
      $scope.$apply();
    });    
  });

  $scope.checkTriggerCondition = function(bondId) {
    IlsContract.deployed().then(function(contract) {
      contract.checkTriggerCondition(bondId, {from: web3.eth.accounts[49], gas:500000, value: web3.toWei('1', 'ether')}).then(function (result) {
          $scope.windSpeed = result;
          $scope.$apply();
      }).catch(function (error) {
          console.error(error);
          $scope.result = "Error";
          $scope.$apply();
      });
    });
  }

  $scope.subscribeBond = function(bondId, quantity) {
    IlsContract.deployed().then(function(contract) {
      contract.subscribe(bondId, quantity).then(function () {
          $scope.success = true;
          $scope.$apply();
      }).catch(function (error) {
          console.error(error);
          $scope.errors = error;
          $scope.$apply();
      });
    });
  }

});
