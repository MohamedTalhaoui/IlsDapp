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
    contract.WeatherCheckReceived().watch(function(error, result) {
      console.log(result.args);
      $scope.conditions[result.args.bondId] = result.args.windSpeed;
      $scope.$apply();
    });    
  });

  $scope.checkWeatherCondition = function(strBondId) {
    var bondId = parseInt(strBondId, 10);
    IlsContract.deployed().then(function(contract) {
      return contract.checkWeatherCondition(bondId, {from: web3.eth.accounts[49], gas:500000, value: web3.toWei('1', 'ether')});
    }).then(function () {
      //success
    }).catch(function (error) {
      console.error(error);
      $scope.errors = error;
      $scope.$apply();
    });
  }

  $scope.refreshWindSpeed = function(bondId) {
    IlsContract.deployed().then(function(contract) {
      return contract.getConditionForBond(bondId, {from: web3.eth.accounts[49]});
    }).then(function (result) {
        console.log(bondId);
        console.log(result);
        $scope.conditions[bondId] = result;
        $scope.$apply();
    }).catch(function (error) {
      console.error(error);
      $scope.errors = error;
      $scope.$apply();
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
