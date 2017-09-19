var app = angular.module('IlsDapp');

app.controller('IssuersController', function($scope, Cities){

  $scope.cities = Cities.list();
  $scope.city = null;

  $scope.issueBond = function(principal, termInMonths, rate) {
    IlsContract.deployed().then(function(contract) {
      return contract.issue(principal, termInMonths, rate, $scope.city, {from: web3.eth.accounts[49], gas:500000})
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
