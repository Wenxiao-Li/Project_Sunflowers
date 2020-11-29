// background countdown process
const DEBUG = false;

const MINUTES_STEP_SIZE = 15;
const MIN_MINUTES = MINUTES_STEP_SIZE;
const MAX_MINUTES = MINUTES_STEP_SIZE * 16;
const INIT_MINUTES = MINUTES_STEP_SIZE * 2;
const MIN_TO_SEC = 60;
const SEC_TO_MILLISEC = 1000;

const STATUS_NOT_STARTED = 0;
const STATUS_RUNNING = 1;
const STATUS_PAUSED = 2;
const STATUS_SUCCESS = 3;
const STATUS_FAILURE = 4;

var Session = {
  status: STATUS_NOT_STARTED,
  startMinutes: INIT_MINUTES,
  startSeconds: INIT_MINUTES * MIN_TO_SEC,
  pastSeconds: 0,
  displaySeconds: 0,
  completeCallback: null,
  updateCallback: null,

  setCallbacks: function (updateCallback, completeCallback) {
    this.updateCallback = updateCallback;
    this.completeCallback = completeCallback;
  },

  updateInSessionTime: function () {
    const minutes = Math.floor(this.displaySeconds / MIN_TO_SEC);
    const seconds = parseInt(this.displaySeconds % MIN_TO_SEC);
    this.updateCallback(minutes, seconds, this.status);
  },

  updateUnStartedTime: function () {
    const minutes = this.startMinutes;
    const seconds = 0;
    this.updateCallback(minutes, seconds, this.status);
  },

  // start the session
  run: function () {
    var self = this;
    this.startSeconds = this.startMinutes * MIN_TO_SEC;
    this.interval = setInterval(function () {
      self.pastSeconds += 1;
      self.displaySeconds = self.startSeconds - self.pastSeconds;
      if (self.displaySeconds === 0) {
        self.quitSession(() => {});
        self.status = STATUS_SUCCESS;
        self.completeCallback();
      } else {
        self.updateInSessionTime();
      }
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
    if (this.status === STATUS_NOT_STARTED) {
      if (this.startMinutes > MIN_MINUTES) {
        this.startMinutes -= MINUTES_STEP_SIZE;
        this.updateUnStartedTime();
      }
    }
  },

  increaseTime: function () {
    if (this.status === STATUS_NOT_STARTED) {
      if (this.startMinutes < MAX_MINUTES) {
        this.startMinutes += MINUTES_STEP_SIZE;
        this.updateUnStartedTime();
      }
    }
  },

  startSession: function (startCallback) {
    if (this.status === STATUS_NOT_STARTED) {
      this.run();
      this.status = STATUS_RUNNING;
      startCallback();
    }
  },

  quitSession: function (callback) {
    if (this.status === STATUS_RUNNING || this.status === STATUS_PAUSED) {
      clearInterval(this.interval);
      delete this.interval;
      this.status = STATUS_FAILURE;
      this.startMinutes = INIT_MINUTES;
      this.pastSeconds = 0;
      this.updateUnStartedTime();
      callback();
    }
  },

  toggleSession: function (pauseCallback, resumeCallback) {
    if (this.status === STATUS_RUNNING) {
      this.pause();
      this.status = STATUS_PAUSED;
      this.updateInSessionTime();
      pauseCallback();
    } else if (this.status === STATUS_PAUSED) {
      this.resume();
      this.status = STATUS_RUNNING;
      this.updateInSessionTime();
      resumeCallback();
    }
  },
};

// Receive FrontEnd message and process the session countdown on background
export const runSession = (
  updateCallback,
  startCallback,
  completeCallback,
  quitCallback,
  pauseCallback,
  resumeCallback
) => {
  Session.setCallbacks(updateCallback, completeCallback);
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.msg === 'decrease-time') {
      Session.decreaseTime();
    } else if (request.msg === 'increase-time') {
      Session.increaseTime();
    } else if (request.msg == 'start-session') {
      Session.startSession(startCallback);
    } else if (request.msg == 'toggle-session') {
      Session.toggleSession(pauseCallback, resumeCallback);
    } else if (request.msg == 'quit-session') {
      Session.quitSession(quitCallback);
    } else if (request.msg == 'back-session') {
      Session.status = STATUS_NOT_STARTED;
      Session.updateUnStartedTime();
    } else if (request.msg == 'init-display') {
      if (
        Session.status === STATUS_RUNNING ||
        Session.status === STATUS_PAUSED
      ) {
        Session.updateInSessionTime();
      } else {
        Session.updateUnStartedTime();
      }
    }
  });
};

export const forceUpdateSession = () => {
  if (Session.status === STATUS_RUNNING || Session.status === STATUS_PAUSED) {
    Session.updateInSessionTime();
  } else {
    Session.updateUnStartedTime();
  }
};
