/**
 * Created by samk on 25/02/2017.
 */
import { ReduceStore } from 'flux/utils';
import Dispatcher from './RTChatDispatcher';
import RTChatActionTypes from './RTChatActionTypes';

class RTChatPeerMessageListStore extends  ReduceStore {
  constructor() {
    super(Dispatcher);
    this._state = {
      liveUsers: new Set(),
      stores: []
    }
  }

  getInitialState() {
    return []
  }

  getState() {
    return this._state.stores
  }

  reduce(state, action) {
    switch (action.type) {
      case RTChatActionTypes.PEER_CHAR_CODE: {
        if (!state.liveUsers.has(action.username)) {
          state.liveUsers.add(action.username);
          let newStores = state.stores.slice();

          newStores.push(new RTChatPeerMessageStore(
            action.username,
            String.fromCharCode(action.charCode)
          ));

          return {
            stores: newStores,
            liveUsers: state.liveUsers
          };
        }

        return state;
      }
      case RTChatActionTypes.PEER_ENTER_MESSAGE: {
        state.liveUsers.delete(action.username);

        return state;
      }
      default:
        return state;
    }
  }
}

class RTChatPeerMessageStore extends ReduceStore {
  constructor(username, initMsg) {
    super(Dispatcher);
    this._state = {
      live: true,
      msg: initMsg,
      username: username
    }
  }

  getInitialState() {
    return {
      live: true,
      msg: '',
      username: ''
    }
  }

  areEqual(one, two) {
    return one.live === two.live && one.msg === two.msg
  }

  reduce(state, action) {
    // TODO: move this logic to custom dispatch
    if (action.username === state.username && state.live) {
      switch (action.type) {
        case RTChatActionTypes.PEER_CHAR_CODE: {
          return {
            live: state.live,
            msg: state.msg + String.fromCharCode(action.charCode),
            username: state.username
          };
        }
        case RTChatActionTypes.PEER_BACKSPACE: {
          return {
            live: state.live,
            msg: state.msg.substring(0, state.msg.length - 1),
            username: state.username
          }
        }
        case RTChatActionTypes.PEER_ENTER_MESSAGE: {
          return {
            live: false,
            msg: state.msg,
            username: state.username
          }
        }
        default:
          return state;
      }
    }

    return state;
  }
}

const store = new RTChatPeerMessageListStore();

export default store;

/*
class RTChatPeerMessageStore extends ReduceStore {
  constructor() {
    super(Dispatcher)
  }

  areEqual(one, two) {
    return one.key === two.key;
  }

  getInitialState() {
    return {
      messageSeq: 0,
      key: 0,
      peers: {}
    }
  }

  getPeerMessages() {
    let messages = [];
    let peers = this.getState().peers;

    Object.keys(peers).forEach(p => {
      peers[p].messages.forEach(
        m => messages[m.seq] = {
          username: p,
          message: m.str,
          key: m.seq
        }
      );
      if(peers[p].liveMsg) {
        messages[peers[p].liveMsg.seq] = {
          username: p,
          message: peers[p].liveMsg.str,
          key: peers[p].liveMsg.seq
        }
      }
    });

    return messages;
  }

  getPeerMessagesKey() {
    return this.getState().key;
  }

  enterMessage(state, username) {
    if (!state.peers[username]) {
      throw new Error("Couldn't find peer: " + username)
    }
    else {
      let peer = state.peers[username];
      peer.messages.push(peer.liveMsg);
      peer.liveMsg = null;
    }
  }

  putCharCode(state, username, charCode) {
     if (!state.peers[username]) {
       state.peers[username] = {
         messages: [],
         liveMsg: {
           seq: state.messageSeq++,
           str: String.fromCharCode(charCode)
         }
       };
     }
     else {
       let peer = state.peers[username];
       if(!peer.liveMsg) {
         peer.liveMsg = {
           seq: state.messageSeq++,
           str: String.fromCharCode(charCode)
         }
       }
       else {
         peer.liveMsg.str += String.fromCharCode(charCode)
       }
     }

     return state;
  }

  reduce(state, action) {
    switch (action.type) {
      case RTChatActionTypes.PEER_CHAR_CODE: {
        const username = action.username;
        const charCode = action.charCode;
        state.key++;

        try {
          return this.putCharCode(state, username, charCode)
        }
        catch (e) {
          console.log(e);

          return {
            messageSeq: state.messageSeq,
            key: ++state.key,
            peers: state.peers
          };
        }
      }
      default:
        return state;
    }
  }
}

const store = new RTChatPeerMessageStore();

export default store;*/
