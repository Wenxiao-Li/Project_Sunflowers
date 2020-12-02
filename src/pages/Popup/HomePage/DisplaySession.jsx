import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Form,
  InputGroup,
  FormControl,
} from 'react-bootstrap';

import './DisplaySession.css';

const STATUS_NOT_STARTED = 0;
const STATUS_RUNNING = 1;
const STATUS_PAUSED = 2;
const STATUS_SUCCESS = 3;
const STATUS_FAILURE = 4;
/**
 * Functional Component for rendering session
 */
export default function DisplaySession() {
  // States
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [status, setStatus] = React.useState(STATUS_NOT_STARTED);

  /**
   * Callback function
   * @param {any} request the request object with messages
   */
  function updateTime(request) {
    if (request.msg === 'update-time') {
      setMinutes(request.data.minutes);
      setSeconds(request.data.seconds);
      setStatus(request.data.status);
    }
    return true;
  }

  /**
   * Init Function, called when mounted
   */
  const initFunction = () => {
    chrome.runtime.sendMessage({
      msg: 'init-display',
    });
    chrome.runtime.onMessage.addListener(updateTime);
  };

  /**
   * With [], equivalent to ComponentDidMount: [] ensure only run at Mount
   * return statement equivalent to ComponentWillUnmount
   */
  React.useEffect(() => {
    initFunction();
    return () => {
      chrome.runtime.onMessage.removeListener(updateTime);
    };
  }, []);

  const postDecreaseTime = () => {
    chrome.runtime.sendMessage({
      msg: 'decrease-time',
      data: {},
    });
  };

  const postIncreaseTime = () => {
    chrome.runtime.sendMessage({
      msg: 'increase-time',
      data: {},
    });
  };

  const postStartSession = () => {
    chrome.runtime.sendMessage({
      msg: 'start-session',
      data: {},
    });
  };

  const postToggleSession = () => {
    chrome.runtime.sendMessage({
      msg: 'toggle-session',
      data: {},
    });
  };

  const postQuitSession = () => {
    chrome.runtime.sendMessage({
      msg: 'quit-session',
      data: {},
    });
  };

  const postBackSession = () => {
    chrome.runtime.sendMessage({
      msg: 'back-session',
    });
  };

  const NotStartedView = () => {
    return (
      <div>
        <button onClick={postDecreaseTime}> &lt; </button>
        <span> {minutes} : </span>
        <span> {String(seconds).padStart(2, '0')} </span>
        <button onClick={postIncreaseTime}> &gt; </button>
        <br />
        <Button variant="round" onClick={postStartSession}>
          Start
        </Button>
      </div>
    );
  };

  const RunningView = () => {
    return (
      <div>
        <span> {minutes} : </span>
        <span> {String(seconds).padStart(2, '0')} </span>
        <br />
        <Button variant="round" onClick={postToggleSession}>
          Pause
        </Button>
        <Button variant="round" onClick={postQuitSession}>
          Quit
        </Button>
      </div>
    );
  };

  const PausedView = () => {
    return (
      <div>
        <span> {minutes} : </span>
        <span> {String(seconds).padStart(2, '0')} </span>
        <br />
        <Button variant="round" onClick={postToggleSession}>
          Resume
        </Button>
        <Button variant="round" onClick={postQuitSession}>
          Quit
        </Button>
      </div>
    );
  };

  const SuccessView = () => {
    return (
      <div>
        <span> Success </span>
        <Button variant="round" onClick={postBackSession}>
          {' '}
          back{' '}
        </Button>
      </div>
    );
  };

  const FailureView = () => {
    return (
      <div>
        <span> Failed </span>
        <Button variant="round" onClick={postBackSession}>
          {' '}
          back{' '}
        </Button>
      </div>
    );
  };

  const View = (props) => {
    const currStatus = props.status;
    if (currStatus === STATUS_NOT_STARTED) {
      return <NotStartedView />;
    } else if (currStatus === STATUS_RUNNING) {
      return <RunningView />;
    } else if (currStatus === STATUS_PAUSED) {
      return <PausedView />;
    } else if (currStatus === STATUS_SUCCESS) {
      return <SuccessView />;
    } else if (currStatus === STATUS_FAILURE) {
      return <FailureView />;
    }
  };

  return (
    <div>
      <View status={status} />
    </div>
  );
}
