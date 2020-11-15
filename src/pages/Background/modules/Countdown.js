 export var Clock = {

  isRunning: false,
  hasStarted: false,
  countMinutes: 60,
  endSeconds: 3600,
  totalSeconds: 0,
  displaySeconds: 0,

  start: function () {
    var self = this;
    
    this.interval = setInterval(function () {
      
      self.totalSeconds += 1;
      self.displaySeconds = self.endSeconds - self.totalSeconds;
      console.log('updating');
      chrome.runtime.sendMessage({
          msg: "updateDisplayedTime",
          data: {
              minutes: Math.floor(self.displaySeconds / 60 % 60),
              seconds: parseInt(self.displaySeconds % 60)
          }
      });
    }, 1000);
  },

  pause: function () {
    clearInterval(this.interval);
    delete this.interval;
  },

  resume: function () {
    if (!this.interval) this.start();
  }
};

export const decreaseTime = () => {
    if(Clock.hasStarted == false){
        Clock.countMinutes -= 15;
        Clock.endSeconds = Clock.countMinutes * 60;
        updateUnStartedTime();
    } else {
        updateDisplayedTime();
    }
};

export const updateUnStartedTime = () => {
    console.log('updating');
    chrome.runtime.sendMessage({
        msg: "updateDisplayedTime",
        data: {
            minutes: Clock.countMinutes,
            seconds: 0
        }
    });
}

export const updateDisplayedTime = () => {
    console.log('updating');
    chrome.runtime.sendMessage({
        msg: "updateDisplayedTime",
        data: {
            minutes: Math.floor(Clock.displaySeconds / 60 % 60),
            seconds: parseInt(Clock.displaySeconds % 60)
        }
    });
}

export const startTimer = () => {
    if (Clock.hasStarted == false){
        Clock.start();
        Clock.hasStarted = true;
        Clock.isRunning = true;
    }
};

export const toggleTimer = () => {
    if (Clock.isRunning){
        console.log('pause');
        Clock.pause();
        Clock.isRunning = !Clock.isRunning;
        updateDisplayedTime();
    }
    else if (Clock.hasStarted){
        console.log('resume');
        Clock.resume();
        Clock.isRunning = !Clock.isRunning;
        updateDisplayedTime();
    }
    else {
        updateUnStartedTime();
    }
};