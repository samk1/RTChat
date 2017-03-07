/**
 * Created by samk on 26/02/2017.
 */
import React from 'react';
import { Container } from 'flux/utils'
import PeerMessageListStore from './RTChatPeerMessageListStore';

class PeerMessageList extends React.Component {
  static getStores(props) {
    return [PeerMessageListStore];
  }

  static calculateState(prevState, props) {
    return {stores: PeerMessageListStore.getState()}
  }

  render () {
    return (
      <div className="peer-message-list">
        {this.state.stores.map((p, i) => <PeerMessageContainer store={p} key={i} />)}
      </div>
    )
  }
}


class PeerMessage extends React.Component {
  static getStores(props) {
    return [props.store]
  }

  static calculateState(prevState, props) {
    return props.store.getState()
  }

  render () {
    const peerMessageDivClasses = live => {
      return "peer-message " + (live ? "peer-message-live" : "peer-message-finished");
    };

    return (
      <div className={peerMessageDivClasses(this.state.live)}>
        <span className="peer-message-username">{this.state.username}:</span>
        <span className="peer-message-message">{this.state.msg}</span>
      </div>
    )
  }
}

const PeerMessageContainer = Container.create(PeerMessage, {withProps: true});
export default Container.create(PeerMessageList);