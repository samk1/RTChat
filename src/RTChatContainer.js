/**
 * Created by samk on 24/02/2017.
 */
import { Container } from 'flux/utils'
import RTChatView from './RTChatView';
import RTChatSentenceStore from './RTChatClientSentenceStore';
import RTChatProtocolBufferStore from './RTChatProtocolBufferStore';
import RTChatActions from './RTChatActions';
import RTChatPeerMessageListStore from './RTChatPeerMessageListStore';
import RTChatTestServerMessageStore from './RTChatTestServerMessageStore';

function getStores() {
  return [
    RTChatSentenceStore,
    RTChatProtocolBufferStore,
    RTChatPeerMessageListStore,
    RTChatTestServerMessageStore
  ];
}

function calculateState() {


  return {
    sentence: RTChatSentenceStore.getState(),
    protocolBuffer: RTChatProtocolBufferStore.getState(),

    serverMessage: RTChatTestServerMessageStore.getState(),

    onInputKeyPress: RTChatActions.inputKeyPress,
    onTick: RTChatActions.tick,
    onInputAction: RTChatActions.inputAction,
    onPeerAction: RTChatActions.peerAction,
    tickInterval: 250
  };
}

export default Container.createFunctional(RTChatView, getStores, calculateState);