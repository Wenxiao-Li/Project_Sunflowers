import React, {Component} from 'react';

class Countdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            backMinutes: 60,
            backSeconds: 0,
        };

        this.backDecreaseTime = this.backDecreaseTime.bind(this);
        this.backStartTimer = this.backStartTimer.bind(this);
        this.backToggleTimer = this.backToggleTimer.bind(this);
    
        var self = this;
        chrome.runtime.sendMessage({
            msg: "popupInit",
            data: {}
        });
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if (request.msg === "updateDisplayedTime") {
                    //  To do something
                    console.log('popup receive');
                    self.setState({backMinutes: request.data.minutes});
                    self.setState({backSeconds: request.data.seconds});
                }
            }
        );
    }


    backDecreaseTime(){
        console.log('d sent');
        this.setState({backMinutes: this.state.backMinutes - 15});
        chrome.runtime.sendMessage({
            msg: "decreaseTime",
            data: {}
        });
    }

    backStartTimer () {
        console.log('s sent');
        chrome.runtime.sendMessage({
            msg: "startTimer",
            data: {}
        });
    }
    backToggleTimer() {
        console.log('t sent');
        chrome.runtime.sendMessage({
            msg: "toggleTimer",
            data: {}
        });
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <span>{this.state.backMinutes}</span>
                        <div className="smalltext">Minutes</div>
                    </div>
                    <div>
                        <span>{this.state.backSeconds}</span>
                        <div className="smalltext">Seconds</div>
                    </div>
                </div>
                <button onClick={this.backDecreaseTime}> decrease </button>
                <button onClick={this.backStartTimer}>Start </button>
                <button onClick={this.backToggleTimer}>Toggle</button>
            </div>
        );
    }
}

export default Countdown