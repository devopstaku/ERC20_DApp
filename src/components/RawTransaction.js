import React from 'react'
import Tx from 'ethereumjs-tx'
import Abi from 'ethereumjs-abi'
import PropTypes from 'prop-types'
import {getGasPrice} from '../lib/dAppService';
import {getTransaction} from '../lib/dAppService';
import {getTransactionCount} from '../lib/dAppService';
import {getTransactionReceipt} from '../lib/dAppService';
import {sendRawTransaction} from '../lib/dAppService';
import {toHex} from '../lib/dAppService';
import {toWei} from '../lib/dAppService';


class RawTransaction extends React.Component {
  state = {
    privateKey: this.props.privateKey,
    ether: 0,
    rawTransaction: ''
  };

  handleNumber = (e) => {
    e.preventDefault();
    this.setState({ether: e.target.value});
  }

  handleRawTransaction = (e) => {
    console.log("props", this.props.privateKey);
    const privKey = new Buffer(this.props.privateKey.substring(2), 'hex')
    console.log(privKey)
    const encodeData = "0x" + Abi.methodID("", []).toString("hex")

    /**
     * nonce: 在 Ethereum 中為避免交易雙花, 所以透過 nonce 紀錄帳號地址過去送的交易, 可看作流水號 (Seq#).
     *        使用 web3.eth.getTransactionCount(account) 
     *        可取得下一次當帳號要送交易時, 需要的 nonce, 另外 nonce 具備連續性, 否則會報錯.
     *        https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gettransactioncount
     * 
     * gasPrice: web3.toHex(2000000000) 大概是 20 gwei
     *           https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gasprice
     * 
     * gasLimit: 一般交易使用 21000 gas，其他交易要使用 web3.eth.estmateGas();
     *           https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gasprice
     * 
     * value: web3.toHex(web3.toWei(25, 'ether'))
     * data: 單純送錢就留空
     */

    const testSender = '0xed45c2db45c8728fdee65683c5f0f6e09aaf54c2'
    const testReceiver = '0xcA72391860CbC20372c97180e4F2159771F24D4b'

    const testValue = toHex(toWei(25, 'gwei'))

    const gasPrice = getGasPrice();
    const gasLimit = 21000;

    // Notice: Becuase the transaction nonce is start from 0
    // So the return value of getTransactionCount should be use in the following transaction directly.
    const nonce = getTransactionCount();

    const sendRawTx = {
      "nonce": nonce,
      "from":testSender,
      "to":testReceiver,
      "value": testValue,
      "gasPrice": toHex(gasPrice), 
      "gasLimit": toHex(gasLimit)
    }

    const tx = new Tx(sendRawTx)
    tx.sign(privKey)

    const serializedTx = tx.serialize()
    console.log(serializedTx.toString('hex'))

    // ref: https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethsendtransaction
    sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, transactionHash) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('tHash',transactionHash);
        getTransaction(transactionHash, function(err, tn) {
          if (err) 
            console.log(err);
          console.log('getTransaction', tn);
        });

        // FIXME: While got the Transaction Hash, it may still could not get the transacation receipt
        getTransactionReceipt(transactionHash, function(err, receipt) {
          if (err)
            console.log(err);
          console.log('getTransactionReceipt', receipt);
        });
      }
    });


    this.setState({
      rawTransaction: serializedTx.toString('hex')
    })
  }

  render() {
    return (
      <div>
        <input type="number" placeholder="0" onChange={this.handleNumber}/>
        <button onClick={this.handleRawTransaction}>GET RAW TRANSACTION</button>
        <h3>{this.state.rawTransaction}</h3>
      </div>
    )
  }

}
export default RawTransaction;

RawTransaction.propTypes = {
  privateKey: PropTypes.string
};