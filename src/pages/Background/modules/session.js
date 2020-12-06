// background countdown process
import * as Status from './sessionStatus';

const MINUTES_STEP_SIZE = 15;
const MIN_MINUTES = MINUTES_STEP_SIZE;
const MAX_MINUTES = MINUTES_STEP_SIZE * 16;
const INIT_MINUTES = MINUTES_STEP_SIZE * 2;
const MIN_TO_SEC = 60;
const SEC_TO_MILLISEC = 1000;

export let Session = {
  status: Status.STATUS_NOT_STARTED,
  isBlocklist: true,
  startMinutes: INIT_MINUTES,
  startSeconds: INIT_MINUTES * MIN_TO_SEC,
  startDate: null,
  pastSeconds: 0,
  displaySeconds: 0,
  completeCallback: null,
  updateCallback: null,

  updateInSessionTime: function () {
    const minutes = Math.floor(this.displaySeconds / MIN_TO_SEC);
    const seconds = parseInt(this.displaySeconds % MIN_TO_SEC);
    this.updateCallback(minutes, seconds, this.status, this.isBlocklist);
  },

  updateUnStartedTime: function () {
    const minutes = this.startMinutes;
    const seconds = 0;
    this.updateCallback(minutes, seconds, this.status, this.isBlocklist);
  },

  // start the session
  run: function () {
    var self = this;
    this.startSeconds = this.startMinutes * MIN_TO_SEC;
    this.interval = setInterval(function () {
      self.pastSeconds += 1;
      self.displaySeconds = self.startSeconds - self.pastSeconds;
      if (self.displaySeconds === 0) {
        self.completeSession(self.completeCallback);
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

  reset: function () {
    clearInterval(this.interval);
    delete this.interval;
    this.startMinutes = INIT_MINUTES;
    this.startDate = null;
    this.pastSeconds = 0;
  },

  decreaseTime: function () {
    if (this.status === Status.STATUS_NOT_STARTED) {
      if (this.startMinutes > MIN_MINUTES) {
        this.startMinutes -= MINUTES_STEP_SIZE;
        this.updateUnStartedTime();
      }
    }
  },

  increaseTime: function () {
    if (this.status === Status.STATUS_NOT_STARTED) {
      if (this.startMinutes < MAX_MINUTES) {
        this.startMinutes += MINUTES_STEP_SIZE;
        this.updateUnStartedTime();
      }
    }
  },

  toggleMode: function () {
    if (this.status === Status.STATUS_NOT_STARTED) {
      this.isBlocklist = !this.isBlocklist;
      this.updateUnStartedTime();
    }
  },

  startSession: function (startCallback) {
    if (this.status === Status.STATUS_NOT_STARTED) {
      this.startDate = new Date();
      this.run();
      this.status = Status.STATUS_RUNNING;
      startCallback(this.isBlocklist);
    }
  },

  completeSession: function (callback) {
    if (
      this.status === Status.STATUS_RUNNING ||
      this.status === Status.STATUS_PAUSED
    ) {
      callback(this.startMinutes, this.startDate, new Date());
      this.reset();
      this.status = Status.STATUS_SUCCESS;
      this.updateUnStartedTime();
    }
  },

  quitSession: function (callback) {
    if (
      this.status === Status.STATUS_RUNNING ||
      this.status === Status.STATUS_PAUSED
    ) {
      callback(this.startMinutes, this.startDate, new Date());
      this.reset();
      this.status = Status.STATUS_FAILURE;
      this.updateUnStartedTime();
    }
  },

  toggleSession: function (pauseCallback, resumeCallback) {
    if (this.status === Status.STATUS_RUNNING) {
      this.pause();
      this.status = Status.STATUS_PAUSED;
      this.updateInSessionTime();
      pauseCallback();
    } else if (this.status === Status.STATUS_PAUSED) {
      this.resume();
      this.status = Status.STATUS_RUNNING;
      this.updateInSessionTime();
      resumeCallback();
    }
  },

  forceUpdateSession: function () {
    if (
      this.status === Status.STATUS_RUNNING ||
      this.status === Status.STATUS_PAUSED
    ) {
      this.updateInSessionTime();
    } else {
      this.updateUnStartedTime();
    }
  },
};
