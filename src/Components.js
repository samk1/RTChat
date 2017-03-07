/**
 * Created by samk on 22/02/2017.
 */
import React, { Component } from 'react';
import Dispatcher from './RTChatDispatcher';
import Stores from './Stores';

export class ChatInput extends Component {
    constructor(props) {
        super(props);
    }

    handleKeyPress (e) {
        Dispatcher.dispatch({
            type: 'input-key-press',
            time: Date.now(),
            charCode: e.charCode
        });
    }

    render() {
        return (
            <textarea
                className="ChatInput"
                onKeyPress={this.handleKeyPress}
            />
        )
    }
}

export class ChatTimer extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.timerId = setInterval(() => this.tick(), 2000);
        this.removeListener = Stores.ProtocolStore.addListener(this.onStoreChanged);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
        this.removeListener();
    }

    tick () {
        Dispatcher.dispatch({
            type: 'tick',
            time: Date.now()
        });

        Dispatcher.waitFor([Stores.ProtocolStore.getDispatchToken()]);

        const protBuf = Stores.ProtocolStore.getProtBuf();

    }

    render() {
        return (
            <h1>{Date.now()}</h1>
        )
    }
}