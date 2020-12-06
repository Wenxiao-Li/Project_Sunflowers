import React from 'react';
import { render } from 'react-dom';
import DisplaySession from '../Popup/HomePage/DisplaySession.jsx';
//include_css("./content.style.css");

const STATUS_NOT_STARTED = 0;
const STATUS_RUNNING = 1;
const STATUS_PAUSED = 2;
const STATUS_SUCCESS = 3;
const STATUS_FAILURE = 4;

const ELEMENT_ID = 'overlay';

function removeElements(elementId) {
  var elementIdCSS = '#' + elementId;
  var elements = document.querySelectorAll(elementIdCSS);
  elements.forEach(removeElement);
}

function removeElement(element) {
  element.parentNode.removeChild(element);
}

const createOverlay = (elementId) => {
  document.body.style.margin = 0;
  document.body.style.padding = 0;
  document.body.onwheel = function () {
    return false;
  };
  document.body.onkeydown = function (e) {
    return false;
  };
  document.body.style.overflow = 'hidden';
  var div = document.createElement('div');
  div.id = elementId;
  document.body.insertBefore(div, document.body.firstChild);
  div.style.display = 'block';
  div.style.width = '100%';
  div.style.height = '100%';
  div.style.position = 'fixed';
  div.style.top = '0px';
  div.style.left = '0px';
  div.style.backgroundColor = '#181818b3';
  div.style.zIndex = '65534';
};

let hasOverlay = false;

function processStatus(status) {
  if (
    status === STATUS_NOT_STARTED ||
    status === STATUS_SUCCESS ||
    status === STATUS_FAILURE ||
    status === STATUS_PAUSED
  ) {
    console.log('overlay removed');
    removeElements(ELEMENT_ID);
    document.body.style.overflow = 'auto';
    document.body.onkeydown = null;
    document.body.onwheel = null;
    hasOverlay = false;
  } else {
    if (hasOverlay === false) {
      console.log('overlay created');
      createOverlay(ELEMENT_ID);
      render(
        <DisplaySession />,
        window.document.querySelector('#' + ELEMENT_ID)
      );
      hasOverlay = true;
    }
  }
}

console.log('Content script works!');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg === 'are-you-there-content?') {
    sendResponse({ status: 'yes' });
  } else if (request.msg === 'update-time') {
    processStatus(request.data.status);
  }
});
