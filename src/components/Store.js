import React, { Component } from 'react'
import {putState} from '../lib/storeService';
import {getState} from '../lib/storeService';


class Store extends Component {
  
  state = {
    obj: {}
  };

  componentDidMount() {
    this.handleBlockNumberLoad();
  }

  handleBlockNumberLoad = async () => {
    // putState({ 'hello': 'world' })

    try {
      const res = getState();
      //const blockNumber = EthUtil.bufferToInt(res.result);
      this.setState({ obj: res });
    } catch (error) {
      console.log(`getState error: ${error}`);
    }
  }

  render() {
    return <div>{this.state.obj.hello}</div>
  }
}

export default Store;
