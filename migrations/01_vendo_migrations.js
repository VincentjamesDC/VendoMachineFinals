// eslint-disable-next-line no-undef
const VendoMachine = artifacts.require('VendoMachine');

module.exports = function (deployer) {
    deployer.deploy(VendoMachine);
}