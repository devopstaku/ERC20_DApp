var Web3 = require('web3');
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/osGEgKzYAw7qneXZ4kAm'));

var blockNumber = web3.eth.blockNumber;
console.log(blockNumber);