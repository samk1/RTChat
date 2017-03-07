/**
 * Created by samk on 24/02/2017.
 */
import { ReduceStore } from 'flux/utils';
import Dispatcher from './RTChatDispatcher';
import RTChatActionTypes from './RTChatActionTypes';
import Decoder from './asn1/Decoder';

class RTChatServerMessageStore extends  ReduceStore {
  constructor() {
    super(Dispatcher)
  }

  getInitialState() {
    return {
      txTime: null,
      username: null,
      sentence: []
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case RTChatActionTypes.EVENT_SOURCE_MESSAGE: {
        try {
          return Decoder.decode(action.messageEvent.data);
        }
        catch (e) {
          console.log(e);
          return state;
        }
      }
      default:
        return state
    }
  }
}

const store = new RTChatServerMessageStore();

export default store;