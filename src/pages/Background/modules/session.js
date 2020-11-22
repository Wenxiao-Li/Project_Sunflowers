// background countdown process
const DEBUG = false;

const MINUTES_STEP_SIZE = 15;
const MIN_MINUTES = MINUTES_STEP_SIZE;
const MAX_MINUTES = MINUTES_STEP_SIZE * 16;
const INIT_MINUTES = MINUTES_STEP_SIZE * 2;
const MIN_TO_SEC = 60;
const SEC_TO_MILLISEC = 1000;

const updateDisplayedTimeMsg = 'updateDisplayedTime';

// Session Timer
var SessionTimer = {
  isRunning: false,
  hasStarted: false,
  startMinutes: INIT_MINUTES,
  startSeconds: INIT_MINUTES * MIN_TO_SEC,
  pastSeconds: 0,
  displaySeconds: 0,

  updateInSessionTime: function () {
    console.log('updating');
    chrome.runtime.sendMessage({
      msg: updateDisplayedTimeMsg,
      data: {
        minutes: Math.floor((this.displaySeconds / MIN_TO_SEC) % MIN_TO_SEC),
        seconds: parseInt(this.displaySeconds % MIN_TO_SEC),
      },
    });
  },

  updateUnStartedTime: function () {
    console.log('updating');
    chrome.runtime.sendMessage({
      msg: updateDisplayedTimeMsg,
      data: {
        minutes: this.startMinutes,
        seconds: 0,
      },
    });
  },

  // start the session
  run: function () {
    var self = this;
    this.startSeconds = this.startMinutes * MIN_TO_SEC;
    this.interval = setInterval(function () {
      self.pastSeconds += 1;
      self.displaySeconds = self.startSeconds - self.pastSeconds;
      self.updateInSessionTime();
    }, SEC_TO_MILLISEC);
  },

  pause: function () {
    clearInterval(this.interval);
    delete this.interval;
  },

  resume: function () {
    if (!this.interval) this.run();
  },

  decreaseTime: function () {
    if (this.hasStarted == false) {
      if (this.startMinutes > MIN_MINUTES) {
        this.startMinutes -= MINUTES_STEP_SIZE;
        this.updateUnStartedTime();
      }
    }
  },

  increaseTime: function () {
    if (this.hasStarted == false) {
      if (this.startMinutes < MAX_MINUTES) {
        this.startMinutes += MINUTES_STEP_SIZE;
        this.updateUnStartedTime();
      }
    }
  },

  startSession: function (callback) {
    if (!this.hasStarted) {
      this.run();
      this.hasStarted = true;
      this.isRunning = true;
      callback();
    }
  },

  stopSession: function (callback) {
    clearInterval(this.interval);
    delete this.interval;
    this.isRunning = false;
    this.hasStarted = false;
    this.startMinutes = INIT_MINUTES;
    this.pastSeconds = 0;
    this.updateUnStartedTime();
    callback();
  },

  toggleSession: function (pauseCallback, resumeCallback) {
    if (this.hasStarted) {
      if (this.isRunning) {
        console.log('paused');
        this.pause();
        this.isRunning = !this.isRunning;
        this.updateInSessionTime();
        pauseCallback();
      } else {
        console.log('resumed');
        this.resume();
        this.isRunning = !this.isRunning;
        this.updateInSessionTime();
        resumeCallback();
      }
    }
  },
};

// Receive FrontEnd message and process the session countdown on background
export const runSession = (
  startCallback,
  stopCallback,
  pauseCallback,
  resumeCallback
) => {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.msg === 'decreaseTime') {
      console.log('receive decrease time');
      SessionTimer.decreaseTime();
    } else if (request.msg === 'increaseTime') {
      console.log('receive increase time');
      SessionTimer.increaseTime();
    } else if (request.msg == 'startSession') {
      console.log('receive start');
      SessionTimer.startSession(startCallback);
    } else if (request.msg == 'toggleSession') {
      SessionTimer.toggleSession(pauseCallback, resumeCallback);
    } else if (request.msg == 'stopSession') {
      SessionTimer.stopSession(stopCallback);
    } else if (request.msg == 'popupInit') {
      if (SessionTimer.hasStarted) {
        SessionTimer.updateInSessionTime();
      } else {
        SessionTimer.updateUnStartedTime();
      }
    }
  });
};
