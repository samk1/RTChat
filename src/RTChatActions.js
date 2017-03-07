/**
 * Created by samk on 24/02/2017.
 */
import RTChatActionTypes from './RTChatActionTypes'
import RTChatDispatcher from './RTChatDispatcher'

const Actions = {
  inputKeyPress(timestamp, charCode) {
    RTChatDispatcher.dispatch({
      type: RTChatActionTypes.INPUT_KEY_PRESS,
      timestamp, charCode
    })
  },

  tick() {
    RTChatDispatcher.dispatch({
      type: RTChatActionTypes.PROTOCOL_TICK,
      timestamp: Date.now()
    });
    RTChatDispatcher.dispatch({
      type: RTChatActionTypes.PROTOCOL_FLUSH,
      timestamp: Date.now()
    })
  },


  connect(url) {
    const eventSource = new EventSource(url);

    eventSource.onerror = (e) => {
      RTChatDispatcher.dispatch({
        type: RTChatActionTypes.EVENT_SOURCE_ERROR,
        errorEvent: e
      });

      console.log(e);

      Actions.connect(url);
    };

    eventSource.onopen = (e) => {
      RTChatDispatcher.dispatch({
        type: RTChatActionTypes.EVENT_SOURCE_OPEN,
        openEvent: e
      })
    };

    eventSource.onmessage = (e) => {
      RTChatDispatcher.dispatch({
        type: RTChatActionTypes.EVENT_SOURCE_MESSAGE,
        messageEvent: e
      })
    }
  },

  peerAction(action) {
    const rxTimeDiff = Date.now() - action.txTime;
    const actualSleep = action.sleep - rxTimeDiff;

    if (actualSleep < 0) {
      // Uh oh! send the charCode now
      requestAnimationFrame(() => RTChatDispatcher.dispatch(action))
    }
    else {
      // procrastinate
      setTimeout(() =>
        requestAnimationFrame(() => RTChatDispatcher.dispatch(action)),
        actualSleep
      );
    }
  },

  inputAction(action) {
    RTChatDispatcher.dispatch(action);
  }
};


export default Actions
