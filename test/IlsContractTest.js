var IlsContract = artifacts.require("./IlsContract.sol");

contract('IlsContract', function (accounts) {


  it('Bond issuance', function () {
    var contract;

    return IlsContract.deployed().then(function(instance) {
      contract = instance;
      return contract.registerIssuer(accounts[1], 'insuranceA');
    }).then(function() {
      return contract.isIssuer(accounts[1]);
    }).then(function (isIssuer) {
        assert.equal(isIssuer, true, 'not an issuer');
        return contract.issue(1, 2, 3, 4, 'hurricane');
    }).then(function (bondId) {
        assert.equal(bondId, 1, 'invalid id');
        return contract.getBonds();
    }).then(function (bonds) {
        assert.equal(bonds.length, 1, 'invalid size');
        assert.equal(bonds[0], 1, 'invalid id');
    });
  });

});