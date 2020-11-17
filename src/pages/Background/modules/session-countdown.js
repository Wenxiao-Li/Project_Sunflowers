// background countdown process
var SessionCountdown = {

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

const decreaseTime = () => {
    if(SessionCountdown.hasStarted == false){
        SessionCountdown.countMinutes -= 15;
        SessionCountdown.endSeconds = SessionCountdown.countMinutes * 60;
        updateUnStartedTime();
    }
};

const updateUnStartedTime = () => {
    console.log('updating');
    chrome.runtime.sendMessage({
        msg: "updateDisplayedTime",
        data: {
            minutes: SessionCountdown.countMinutes,
            seconds: 0
        }
    });
}

const updateInSessionTime = () => {
    console.log('updating');
    chrome.runtime.sendMessage({
        msg: "updateDisplayedTime",
        data: {
            minutes: Math.floor(SessionCountdown.displaySeconds / 60 % 60),
            seconds: parseInt(SessionCountdown.displaySeconds % 60)
        }
    });
}

const startTimer = () => {
    if (SessionCountdown.hasStarted == false){
        SessionCountdown.start();
        SessionCountdown.hasStarted = true;
        SessionCountdown.isRunning = true;
    }
};

const toggleTimer = () => {
    if (SessionCountdown.isRunning){
        console.log('pause');
        SessionCountdown.pause();
        SessionCountdown.isRunning = !SessionCountdown.isRunning;
        updateInSessionTime();
    }
    else if (SessionCountdown.hasStarted){
        console.log('resume');
        SessionCountdown.resume();
        SessionCountdown.isRunning = !SessionCountdown.isRunning;
        updateInSessionTime();
    }
    else {
        updateUnStartedTime();
    }
};

// Receive FrontEnd message and process the session countdown on background
export const processSessionCountdown = () => {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.msg === "decreaseTime") {
                //  To do something
                console.log("receive decrease time");
                decreaseTime();
            }
            else if (request.msg == "startTimer") {
                console.log("receive start");
                startTimer();
            }
            else if (request.msg == "toggleTimer"){
                toggleTimer();
            }
            else if (request.msg == "popupInit"){
                if (SessionCountdown.hasStarted){
                    updateInSessionTime();
                }
                else {
                    updateUnStartedTime();
                }
                
            }
        }
    );
}