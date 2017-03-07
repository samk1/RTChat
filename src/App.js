import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ProtocolStore } from './Stores';
import { ChatInput} from './Components';

const protocolStore = new ProtocolStore();

class App extends Component {
  componentDidMount() {
    this.removeListener = protocolStore.addListener(this.onStoreChanged);
  }

  onStoreChanged() {
    this.setState({
      clientMessage: protocolStore.getClientMessage()
   });
  }

  render() {
    var clientMessage = protocolStore.getClientMessage();

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ChatInput />
      </div>
    );
  }
}

export default App;
