import React, {Component} from 'react';

class SessionCountdown extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            backMinutes: 60,
            backSeconds: 0,
        };

        this.backDecreaseTime = this.backDecreaseTime.bind(this);
        this.backStartTimer = this.backStartTimer.bind(this);
        this.backToggleTimer = this.backToggleTimer.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
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
                    if(self._isMounted){
                        self.setState({backMinutes: request.data.minutes});
                        self.setState({backSeconds: request.data.seconds});
                    }
                }
            }
        );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    backDecreaseTime(){
        console.log('d sent');
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
                        <span>{this.state.backMinutes} Minutes</span>
                        <span> {this.state.backSeconds} Seconds</span>
                    </div>
                </div>
                <button onClick={this.backDecreaseTime}>Decrease </button>
                <button onClick={this.backStartTimer}>Start </button>
                <button onClick={this.backToggleTimer}>Toggle</button>
            </div>
        );
    }
}

export default SessionCountdown