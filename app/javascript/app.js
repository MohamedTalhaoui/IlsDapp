"use strict";

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var app = angular.module("IlsDapp", ['ngRoute']);

app.factory('Accounts', function(){
  var accounts = web3.eth.accounts;
  return {
    list: function() { return accounts; }
  };
});

app.factory('Cities', function(){
  var cities = [
      {key: 4164138, name: 'Miami'},
      {key: 6458783, name: 'Geneva'},
      {key: 2643741, name: 'London'},
      {key: 5128638, name: 'New York'}
  ];
  return {
    list: function() { return cities; }
  };
});

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainController'
  }).when('/issuers', {
    templateUrl: 'views/issuers.html',
    controller: 'IssuersController'
  }).when('/bonds', {
    templateUrl: 'views/bonds.html',
    controller: 'BondsController'
  }).when('/portfolio', {
    templateUrl: 'views/portfolio.html',
    controller: 'PortfolioController'
  }).when('/marketplace', {
    templateUrl: 'views/marketplace.html',
    controller: 'MarketplaceController'
  }).otherwise('/', {redirectTo: '/'});
});