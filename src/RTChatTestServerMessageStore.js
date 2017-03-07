/**
 * Created by samk on 25/02/2017.
 */
import { ReduceStore } from 'flux/utils';
import Dispatcher from './RTChatDispatcher';
import RTChatActionTypes from './RTChatActionTypes';
import RTChatClientSentenceStore from './RTChatClientSentenceStore';

class RTChatTestServerMessageStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
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
      case RTChatActionTypes.PROTOCOL_TICK: {
        Dispatcher.waitFor([RTChatClientSentenceStore.getDispatchToken()]);

        const sentence = RTChatClientSentenceStore.getSentence();


        return {
          txTime: Date.now(),
          username: 'elblanko',
          sentence: sentence.length > 0 ? sentence : state.sentence
        };
      }
      default: {
        return state;
      }
    }
  }
}

const store = new RTChatTestServerMessageStore();

export default store;