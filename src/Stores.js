/**
 * Created by samk on 22/02/2017.
 */
import { ReduceStore } from 'flux/utils';
import Dispatcher from './RTChatDispatcher';

export class ProtocolStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            username: 'elblanko',
            secret: '',
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

        if(!(sleep >= 0 && sleep <= 2000)) {
            throw new RangeError('sleep is out of range: ' + sleep)
        }

        return sleep;
    }

    getSentence() {
        return this.getState().sentence.slice();
    }

    getClientMessage() {
        return {
            txTime: new Date(),
            username: 'bob',
            userSecret: new ArrayBuffer(32),
            seq: 0,
            sentence: this.getSentence()
        }
    }

    reduce(state, action) {
        const actionTime = Date.now();

        switch (action.type) {
            case 'input-key-press': {
                try {
                    const sleep = this.validateSleep(state.timestamp, actionTime);
                    const charCode = this.validateCharCode(action.charCode);

                      state.sentence.push({
                        tag: 'RTChatSleep',
                        value: sleep
                      });

                      state.sentence.push({
                        tag: 'RTChatCharCode',
                        value: charCode
                      });

                      return {
                        timestamp: actionTime,
                        sentence: state.sentence
                      };
                }
                catch (e) {
                    console.log(e);

                    return {
                        timestamp: actionTime,
                        sentence: state.sentence
                    }
                }

            }
            case 'tick': {
                const sleep = this.validateSleep(state.timestamp - actionTime);

                state.sentence.push({
                    tag: 'RTChatCharCode',
                    value: sleep
                });
            }
        }

    }
}