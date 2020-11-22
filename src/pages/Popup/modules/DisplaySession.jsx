import React, { Component } from 'react';

class DisplaySession extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      displayedMinutes: 60,
      displayedSeconds: 0,
    };

    this.postDecreaseTime = this.postDecreaseTime.bind(this);
    this.postIncreaseTime = this.postIncreaseTime.bind(this);
    this.postStartSession = this.postStartSession.bind(this);
    this.postToggleSession = this.postToggleSession.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    var self = this;
    chrome.runtime.sendMessage({
      msg: 'popupInit',
      data: {},
    });
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (request.msg === 'updateDisplayedTime') {
        //  To do something
        console.log('popup receive');
        if (self._isMounted) {
          self.setState({ displayedMinutes: request.data.minutes });
          self.setState({ displayedSeconds: request.data.seconds });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  postDecreaseTime() {
    chrome.runtime.sendMessage({
      msg: 'decreaseTime',
      data: {},
    });
  }

  postIncreaseTime() {
    chrome.runtime.sendMessage({
      msg: 'increaseTime',
      data: {},
    });
  }

  postStartSession() {
    chrome.runtime.sendMessage({
      msg: 'startSession',
      data: {},
    });
  }
  postToggleSession() {
    chrome.runtime.sendMessage({
      msg: 'toggleSession',
      data: {},
    });
  }

  postStopSession() {
    chrome.runtime.sendMessage({
      msg: 'stopSession',
      data: {},
    });
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <button onClick={this.postDecreaseTime}> &lt; </button>
            <span> {this.state.displayedMinutes} : </span>
            <span>
              {' '}
              {String(this.state.displayedSeconds).padStart(2, '0')}{' '}
            </span>
            <button onClick={this.postIncreaseTime}> &gt; </button>
          </div>
        </div>
        <button onClick={this.postStartSession}>Start</button>
        <button onClick={this.postToggleSession}>Toggle</button>
        <button onClick={this.postStopSession}>Stop</button>
      </div>
    );
  }
}

export default DisplaySession;
