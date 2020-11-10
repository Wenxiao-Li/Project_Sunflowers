

// this can be anything based on user's design
let countMinutes = 60;
var displaySeconds = countMinutes * 60;
$("#hours").text(Math.floor(displaySeconds / 3600));
$("#minutes").text(Math.floor(displaySeconds / 60 % 60));
$("#seconds").text(parseInt(displaySeconds % 60));

var Clock = {
  endSeconds: countMinutes * 60,
  totalSeconds: 0,




  start: function () {
    var self = this;


    this.interval = setInterval(function () {
      
      if(hasStarted)
        self.totalSeconds += 1;
      else
        self.totalSeconds = 0;
      
      displaySeconds = self.endSeconds - self.totalSeconds;

      if (displaySeconds >= 0 && hasStarted) {
        $("#hours").text(Math.floor(displaySeconds / 3600));
        $("#minutes").text(Math.floor(displaySeconds / 60 % 60));
        $("#seconds").text(parseInt(displaySeconds % 60));
      }

      if (displaySeconds <= 0 && hasStarted) {
        clearInterval(this.interval);
        delete this.interval;
        self.totalSeconds = 0;
        hasStarted = false;
      }
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


let isRunning = true;
let hasStarted = false;
$('#pause').click(function () {
  if (isRunning) {
    Clock.pause();
  }
  else {
    Clock.resume();
  }
  isRunning = !isRunning;

});
$('#start').click(function () {
  console.log(hasStarted);
  if (hasStarted == false) {
    Clock.start();
    hasStarted = true;
  }
});