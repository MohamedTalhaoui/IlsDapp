var app = angular.module('IlsDapp');

app.controller('BondsController', function($scope){

  $scope.bonds = [];
  $scope.conditions = [];

  IlsContract.deployed().then(function(contract) {
    contract.BondIssued(null, {fromBlock: 0, toBlock: 'latest'}, function(error, result) {
      $scope.bonds.push(result.args);
      $scope.$apply();
    });    
  });

  IlsContract.deployed().then(function(contract) {
    contract.BondSubscribed(null, {fromBlock: 0, toBlock: 'latest'}, function(error, result) {
      console.log(error);
      var bond = result.args;
      console.log(result);
      $scope.bonds[bond.bondId].quantity=bond.remainingQuantity;
      $scope.$apply();
    });    
  });

  IlsContract.deployed().then(function(contract) {
    contract.WeatherCheckReceived().watch(function(error, result) {
      console.log(result.args);
      $scope.conditions[result.args.bondId] = result.args.windSpeed;
      $scope.$apply();
    });    
  });

  $scope.checkWeatherCondition = function(strBondId) {
    var bondId = parseInt(strBondId, 10);
    IlsContract.deployed().then(function(contract) {
      var tx = {gas:500000, value: web3.toWei('1', 'ether')};
      tx.from = $scope.account;
      return contract.checkWeatherCondition(bondId, tx);
    }).then(function () {
      //success
    }).catch(function (error) {
      console.error(error);
      $scope.errors = error;
      $scope.$apply();
    });
  }

  $scope.subscribeBond = function(bondId, quantity) {
    IlsContract.deployed().then(function(contract) {
      var tx = {gas:500000, value: web3.toWei('1', 'ether')};
      tx.from = $scope.account;
      return contract.subscribe(bondId, quantity, tx);
    }).then(function (bondId) {
      console.log(bondId);
      $scope.success = true;
      $scope.$apply();
    }).catch(function (error) {
      console.error(error);
      $scope.errors = error;
      $scope.$apply();
    });
  }

});
