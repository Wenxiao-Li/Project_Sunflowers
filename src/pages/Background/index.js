import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import '../../assets/img/IMG_1277.jpg';
import './modules/FirebaseConfig';
import { dbHandle } from './modules/Firestore';
import {user_signedin, signInListener} from './modules/UserStatus';
import * as Countdown from './modules/Countdown';

dbHandle();
signInListener();
console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "decreaseTime") {
            //  To do something
            console.log("receive decrease time");
            Countdown.decreaseTime();
        }
        else if (request.msg == "startTimer") {
            console.log("receive start");
            Countdown.startTimer();
        }
        else if (request.msg == "toggleTimer"){
            Countdown.toggleTimer();
        }
        else if (request.msg == "popupInit"){
            if (Countdown.Clock.hasStarted){
                Countdown.updateDisplayedTime();
            }
            else {
                Countdown.updateUnStartedTime();
            }
            
        }
    }
);