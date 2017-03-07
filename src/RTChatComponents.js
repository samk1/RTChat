/**
 * Created by samk on 27/02/2017.
 */
import React from 'react';
import InputActions from './RTChatInputActionCreators';

export class Ticker extends React.Component {
  componentDidMount() {
    this.timerId = setInterval(
      this.props.onTick,
      this.props.tickInterval ? this.props.tickInterval : 2000 // <- default value
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  render() {
    return null
  }
}

const CHARCODE_ENTER = 13;
export class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}
  }

  onInputKeyPress(charCode, onInputAction, setState) {
    const timestamp = Date.now();
    if(charCode === CHARCODE_ENTER) {
      // send the input enter action and clear the input
      this.props.onInputAction(
        InputActions.createInputEnterAction(timestamp)
      );
      setState({value: ''})
    }
    else {
      // send an ordinary key press action
      onInputAction(
        InputActions.createInputKeyPressAction(charCode, timestamp)
      );
    }
  }

  onInputChange(newValue, prevValue, onInputAction, setState) {
    const timestamp = Date.now();

    if((prevValue.length - newValue.length) === 1) {
      onInputAction(
        InputActions.createInputBackspaceAction(timestamp)
      );
    }

    setState({value: newValue});
  }

  render() {
    return (
      <input
        className="rtchat-chat-input"
        onKeyPress={e => this.onInputKeyPress(
          e.charCode,
          this.props.onInputAction,
          this.setState.bind(this)
        )}
        onChange={e => this.onInputChange(
          e.target.value,
          this.state.value,
          this.props.onInputAction,
          this.setState.bind(this)
        )}
        value={this.state.value}
      />
    )
  }
}

export class ChatOutput extends React.Component {
  render() {
    return (
      <div>{this.props.protocolBuffer}</div>
    );
  }
}