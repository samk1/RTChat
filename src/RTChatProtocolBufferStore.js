/**
 * Created by samk on 24/02/2017.
 */
import { ReduceStore } from 'flux/utils';
import RTChatDispatcher from './RTChatDispatcher';
import RTChatActionTypes from './RTChatActionTypes';
import RTChatClientMessageStore from './RTChatClientSentenceStore'

class RTChatProtocolBufferStore extends ReduceStore {
  constructor() {
    super(RTChatDispatcher);
  }

  getInitialState() {
    return ''
  }

  encodeClientMessage(clientMessage) {
    return JSON.stringify(clientMessage)
  }

  reduce(state, action) {
    switch (action.type) {
      case RTChatActionTypes.PROTOCOL_TICK: {
        RTChatDispatcher.waitFor([RTChatClientMessageStore.getDispatchToken()]);

        const clientMessage = RTChatClientMessageStore.getSentence();

        return this.encodeClientMessage(clientMessage)
      }
      default: {
        return state;
      }
    }
  }
}

const store = new RTChatProtocolBufferStore();

export default store;