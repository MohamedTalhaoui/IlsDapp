var app = angular.module('IlsDapp');

app.controller('PortfolioController', function($scope){

  $scope.bonds = [];
  $scope.conditions = [];

  IlsContract.deployed().then(function(contract) {
    contract.BondSubscribed(null, {fromBlock: 0, toBlock: 'latest'}, function(error, result) {
      var bond = result.args;
      console.log(bond.investor);
      console.log($scope.account);
      if(bond.investor == $scope.account) {
        $scope.bonds.push(bond);
        $scope.$apply();        
      }
    });    
  });

  $scope.offerForSale = function(bondId, quantityForSale, sellPrice) {
    IlsContract.deployed().then(function(contract) {
      var tx = {gas:500000};
      tx.from = $scope.account;
      return contract.offerForSale(bondId, quantityForSale, sellPrice, tx);
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
