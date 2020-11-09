

  // this can be anything based on user's design
  let countMinutes = 60;
  
  var Clock = {
    endSeconds: countMinutes * 60,
    totalSeconds: 0,
  
    start: function () {
      var self = this;
      

      this.interval = setInterval(function () {
        
        self.totalSeconds += 1;
        displaySeconds = self.endSeconds - self.totalSeconds;

        $("#hours").text(Math.floor(displaySeconds / 3600));
        $("#minutes").text(Math.floor(displaySeconds / 60 % 60));
        $("#seconds").text(parseInt(displaySeconds % 60));
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
    if(isRunning){
      Clock.pause(); 
    }
    else{
      Clock.resume();
    }
    isRunning = !isRunning;
  
  });
  $('#start').click(function () { 
    if(hasStarted == false){
      Clock.start(); 
      hasStarted = true;
    }
  });