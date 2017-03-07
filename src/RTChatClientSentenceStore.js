/**
 * Created by samk on 24/02/2017.
 */
import { ReduceStore } from 'flux/utils';
import Dispatcher from './RTChatDispatcher';
import RTChatActionTypes from './RTChatActionTypes';
import Tags from './asn1/Tags';

class RTChatClientSentenceStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return {
      timestamp: Date.now(),
      sentence: []
    };
  }

  areEqual(one, two) {
    return (
      one.timestamp === two.timestamp &&
      one.sentence.length === two.sentence.length
    )
  }

  validateCharCode(charCode) {
    if(!Number.isInteger(charCode)) {
      throw new TypeError('charCode is not an integer: ' + charCode)
    }

    if(!(charCode >= 0 && charCode <= 65535)) {
      throw new RangeError('charCode is out of range: ' + charCode)
    }

    return charCode;
  }

  validateSleep(timestamp, actionTime) {
    const sleep = actionTime - timestamp;

    if(!Number.isInteger(sleep)) {
      throw new TypeError('sleep is not an integer: ' + sleep)
    }

    return sleep;
  }

  pushTag(sentence, tag, value) {
    if(value) {
      sentence.push({tag, value});
    }
    else {
      sentence.push({tag});
    }
  }

  pushSleep(sentence, value) {
    this.pushTag(sentence, Tags.RTChatSleep, value);
  }

  pushCharCode(sentence, value) {
    this.pushTag(sentence, Tags.RTChatCharCode, value);
  }

  pushChangeMessage(sentence, value) {
    this.pushTag(sentence, Tags.RTChatChangeMessage, value);
  }

  pushEnterMessage(sentence) {
    this.pushTag(sentence, Tags.RTChatEnterMessage);
  }

  pushBackspace(sentence) {
    this.pushTag(sentence, Tags.RTChatBackspace);
  }

  getSentence() {
    return this.getState().sentence;
  }

  reduce(state, action) {
    switch (action.type) {
      case RTChatActionTypes.INPUT_KEY_PRESS: {
        try {
          const sleep = this.validateSleep(state.timestamp, action.timestamp);
          const charCode = this.validateCharCode(action.charCode);
          let newSentence = state.sentence.slice();

          this.pushSleep(newSentence, sleep);
          this.pushCharCode(newSentence, charCode);

          return {
            timestamp: state.timestamp,
            sentence: newSentence
          };
        }
        catch (e) {
          console.log(e);

          return state;
        }
      }
      case RTChatActionTypes.INPUT_ENTER: {
        try {
          const sleep = this.validateSleep(state.timestamp, action.timestamp);
          let newSentence = state.sentence.slice();

          this.pushSleep(newSentence, sleep);
          this.pushEnterMessage(newSentence);

          return {
            timestamp: state.timestamp,
            sentence: newSentence
          };
        }
        catch (e) {
          console.log(e);

          return state;
        }
      }
      case RTChatActionTypes.INPUT_BACKSPACE: {
        try {
          const sleep = this.validateSleep(state.timestamp, action.timestamp);
          let newSentence = state.sentence.slice();

          this.pushSleep(newSentence, sleep);
          this.pushBackspace(newSentence);

          return {
            timestamp: state.timestamp,
            sentence: newSentence
          };
        }
        catch (e) {
          console.log(e);

          return state;
        }
      }
      case RTChatActionTypes.PROTOCOL_FLUSH: {
        return {
          timestamp: Date.now(),
          sentence: []
        }
      }
      default: {
        return state
      }
    }
  }
}

const store = new RTChatClientSentenceStore();

export default store;