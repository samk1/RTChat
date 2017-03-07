/**
 * Created by samk on 26/02/2017.
 */
import ActionTypes from './RTChatActionTypes';

const ActionCreators = {
  createPeerCharCodeAction: function(charCode, sleep, username, txTime) {
    return {
      type: ActionTypes.PEER_CHAR_CODE,
      charCode, username, sleep, txTime
    }
  },
  
  createPeerEnterMessageAction: function(sleep, username, txTime) {
    return {
      type: ActionTypes.PEER_ENTER_MESSAGE,
      username, sleep, txTime
    }
  },
  
  createPeerBackspaceAction: function(sleep, username, txTime) {
    return {
      type: ActionTypes.PEER_BACKSPACE,
      username, sleep, txTime
    }
  },
  
  createPeerChangeMessageAction: function(newMessage, sleep, username, txTime) {
    return {
      type: ActionTypes.PEER_CHANGE_MESSAGE,
      newMessage, sleep, txTime
    }
  }
};

export default ActionCreators;