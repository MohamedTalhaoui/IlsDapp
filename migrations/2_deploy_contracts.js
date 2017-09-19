var IlsContract = artifacts.require("./IlsContract.sol");
module.exports = function(deployer) {
  deployer.deploy(IlsContract);
};
