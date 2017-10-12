var app = angular.module('IlsDapp');

app.controller('IssuersController', function($scope, Cities){

  $scope.cities = Cities.list();
  $scope.city = null;

  $scope.issueBond = function(principal, termInMonths, rate, quantity) {
    console.log(quantity);
    IlsContract.deployed().then(function(contract) {
      var tx = {gas:500000};
      tx.from = $scope.account;
      return contract.issue(principal, termInMonths, rate, $scope.city, quantity, tx);
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
