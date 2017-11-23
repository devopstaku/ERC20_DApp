const Web3 = require('web3');
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/osGEgKzYAw7qneXZ4kAm'));

const execFetch = async (url, payload) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw Error(res.statusText); 

  return  await res.json();
};

const getPayload = (id, method, params) => ({
  jsonrpc: '2.0', 
  id,
  method,
  params
});

export const getBlockNumber = () => {
  return web3.eth.blockNumber;
};

export const getAddressBalanceLoad = (address) => {
  return web3.fromWei(web3.eth.getBalance(address), "ether").toString(10);
};


export const getGasPrice = () => {
  return web3.eth.gasPrice;
};

export const toHex = (arg) => {
  return web3.toHex(arg);
}

export const toWei = (number, unit) => {
  return web3.toWei(number, unit);
}

export const getTransactionCount = (account) => {
  return web3.eth.getTransactionCount(account);
};

export const sendRawTransaction = (signedTransactionData, callback) => {
  return web3.eth.sendRawTransaction(signedTransactionData, callback);
};


export const getTransaction = (transactionHash, callback) => {
  return web3.eth.getTransaction(transactionHash, callback);
}

export const getTransactionReceipt = (transactionHash, callback) => {
  return web3.eth.getTransactionReceipt(transactionHash, callback);
}