/**
 * Created by samk on 26/02/2017.
 */
import React from 'react'
import PeerActions from './RTChatPeerActionCreators'
import Tags from './asn1/Tags'

class ServerMessageReader extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !(this.props.serverMessage.sentence === nextProps.serverMessage.sentence)
  }

  parseMessage(state, word, peerAction, username, txTime) {
    switch (word.tag) {
      case Tags.RTChatCharCode: {
        peerAction(PeerActions.createPeerCharCodeAction(
          word.value, state.sleep, username, txTime
        ));

        return {sleep: 0};
      }
      case Tags.RTChatEnterMessage: {
        peerAction(PeerActions.createPeerEnterMessageAction(
          state.sleep, username, txTime
        ));

        return {sleep: 0};
      }
      case Tags.RTChatBackspace: {
        peerAction(PeerActions.createPeerBackspaceAction(
          state.sleep, username, txTime
        ));

        return {sleep: 0};
      }
      case Tags.RTChatChangeMessage: {
        peerAction(PeerActions.createPeerChangeMessageAction(
          word.value, state.sleep, username, txTime
        ));

        return {sleep: 0};
      }
      case Tags.RTChatSleep: {
        state.sleep += word.value;

        return state;
      }
      default:
        return state;
    }
  }

  render () {
    //console.log(`reading server message from ${this.props.serverMessage.username} txTime:${this.props.serverMessage.txTime}`);
    const _this = this;
    const sentence = this.props.serverMessage.sentence;

    if(sentence && sentence.length !== 0) {
      //console.log(JSON.stringify(sentence));

      sentence.reduce(
        (state, word) => _this.parseMessage(
          state, word,
          _this.props.onPeerAction,
          _this.props.serverMessage.username,
          _this.props.serverMessage.txTime
        ), {sleep: 0} // <- initial state
      );
    }
    else {
      if(sentence) {
        console.log(`received 0 length sentence from ${this.props.serverMessage.username} txTime:${this.props.serverMessage.txTime}`);
      }
    }

    return null;
  }
}

export default ServerMessageReader;