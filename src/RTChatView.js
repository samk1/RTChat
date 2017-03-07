/**
 * Created by samk on 24/02/2017.
 */
import React from 'react';
import PeerMessageListContainer from './RTChatPeerMessageListContainer';
import ServerMessageReader from './RTChatServerMessageReader';
import {ChatOutput, ChatInput, Ticker} from './RTChatComponents';

function RTChatView(props) {
  return (
    <div className="rtchat-root-container">
      <div className="rtchat-app-container">
        <div className="rtchat-peer-messages-container">
          <PeerMessageListContainer/>
        </div>
        <div className="rtchat-input-container">
          <ChatInput {...props} />
        </div>
      </div>
      <div className="rtchat-debug-container">
        <ChatOutput {...props} />
      </div>
      <Ticker {...props} />
      <ServerMessageReader {...props}/>
    </div>
  )
}

export default RTChatView