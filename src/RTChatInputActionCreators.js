/**
 * Created by samk on 26/02/2017.
 */
import ActionTypes from './RTChatActionTypes';

const ActionCreators = {
  createInputKeyPressAction: function(charCode, timestamp) {
    return {
      type: ActionTypes.INPUT_KEY_PRESS,
      timestamp, charCode
    };
  },

  createInputEnterAction: function(timestamp) {
    return {
      type: ActionTypes.INPUT_ENTER,
      timestamp
    };
  },

  createInputBackspaceAction: function(timestamp) {
    return {
      type: ActionTypes.INPUT_BACKSPACE,
      timestamp
    };
  }

};

export default  ActionCreators