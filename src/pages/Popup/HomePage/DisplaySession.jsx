import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

import SunflowerIcon from '../../../assets/img/sunflowerIcon.jpg';
import DecreaseIcon from '../../../assets/img/decrease.png';
import IncreaseIcon from '../../../assets/img/increase.png';
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
  const [isBlocklist, setBlocklist] = React.useState(true);
  /**
   * Callback function
   * @param {any} request the request object with messages
   */
  function updateTime(request) {
    if (request.msg === 'update-time') {
      setMinutes(request.data.minutes);
      setSeconds(request.data.seconds);
      setStatus(request.data.status);
      setBlocklist(request.data.isBlocklist);
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
    if (
      window.confirm(
        'Are you sure you want to give up all sunflowers in this session?'
      )
    ) {
      chrome.runtime.sendMessage({
        msg: 'quit-session',
        data: {},
      });
    }
  };

  const postBackSession = () => {
    chrome.runtime.sendMessage({
      msg: 'return-session',
    });
  };

  const changeMode = () => {
    chrome.runtime.sendMessage({
      msg: 'toggle-mode',
    });
  };

  const NotStartedView = () => {
    const numSunflowers = Math.floor(minutes / 15);
    return (
      <div>
        <div id="set-time">
          <Image
            className="op-icons"
            src={DecreaseIcon}
            rounded
            onClick={postDecreaseTime}
          />
          <div className="display-time">
            <span> {minutes} : </span>
            <span> {String(seconds).padStart(2, '0')} </span>
          </div>
          <Image
            className="op-icons"
            src={IncreaseIcon}
            rounded
            onClick={postIncreaseTime}
          />
        </div>
        <div id="num-sunflower" color="black">
          <img className="sfIcon" src={SunflowerIcon} width="50" />
          <span> X {numSunflowers} </span>
        </div>
        <h4 className="statement">
          {' '}
          You will get One Sunflower per 15 minutes{' '}
        </h4>
        <Button variant="outline-dark" size="sm" onClick={changeMode}>
          {isBlocklist ? 'Blocklist' : 'Allowlist'}
        </Button>
        <br />
        <br />
        <Button variant="success" size="sm" onClick={postStartSession}>
          Start
        </Button>
      </div>
    );
  };

  const RunningView = () => {
    return (
      <div>
        <div className="display-time">
          <span> {minutes} : </span>
          <span> {String(seconds).padStart(2, '0')} </span>
        </div>
        <br />
        <br />
        <div>
          <Button variant="success" size="sm" onClick={postToggleSession}>
            Pause
          </Button>
          <span> {'  '} </span>
          <Button variant="success" size="sm" onClick={postQuitSession}>
            Quit
          </Button>
        </div>
      </div>
    );
  };

  const PausedView = () => {
    return (
      <div>
        <div className="display-time">
          <span> {minutes} : </span>
          <span> {String(seconds).padStart(2, '0')} </span>
        </div>
        <br />
        <br />
        <div>
          <Button variant="success" size="sm" onClick={postToggleSession}>
            Resume
          </Button>
          <span> {'  '} </span>
          <Button variant="success" size="sm" onClick={postQuitSession}>
            Quit
          </Button>
        </div>
      </div>
    );
  };

  const SuccessView = () => {
    return (
      <div>
        <span>
          {' '}
          Congratulations! You have successfully planted many sunflowers{' '}
        </span>
        <br />
        <Button variant="success" size="sm" onClick={postBackSession}>
          {' '}
          back{' '}
        </Button>
      </div>
    );
  };

  const FailureView = () => {
    return (
      <div>
        <span>
          {' '}
          Unfortunately, all of your sunflowers planted in this session are
          gone.{' '}
        </span>
        <br />
        <Button variant="success" size="sm" onClick={postBackSession}>
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
    <div className="disSS">
      <View status={status} />
    </div>
  );
}
