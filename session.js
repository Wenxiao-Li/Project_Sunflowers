import {map} from "@firebase/util";

const db = firebase.firestore();

function viewtotalsunflower(){
    let totalflower = 2;
    var user = firebase.auth().currentUser;
    //var email = user.email;
    console.log(user)
    db.collection("user").doc(user).get().then(function(doc) {
        if (doc.exists){
            totalflower = doc.data().user_flower
            const sum = document.getElementById("total sunflower");
            let totalsunflwer = sum.querySelector('.count');
            totalsunflwer.innerHTML = totalflower;
            console.log(totalflower)
        } else{
            console.log("didnt get");
        }
    }).catch(function(error){
        console.log("error")
    });

    return totalflower;
}

function viewWeekHistory(){
    let sessions = 2;
    var user = firebase.auth().currentUser;
    //var email = user.email;
    console.log(user)
    db.collection("user").doc('caiyl1624@gmail.com').get().then(function(doc) {
        if (doc.exists) {
            let dayHistory = new map(); // date/total session time
            let dayNumber = new map(); // date/total session number
            let sessionPerDay = [];
            let lengthOfWeek = [];
            let Date = [];
            sessions = doc.data().session;
            for (let index = 0; index < sessions.length; index++) {
                if (dayHistory.has(sessions[index].data_created)) {
                    dayHistory.set(sessions[index].data_created, dayHistory.get(sessions[index].data_created) + sessions[index].length);
                    dayNumber.set(sessions[index].data_created, dayNumber.get(sessions[index].data_created) + 1);
                } else {
                    dayHistory.set(sessions[index].data_created, sessions[index].length);
                    dayNumber.set(sessions[index].data_created, 1);
                }
            }
            let keyArray = Array.from(dayHistory.keys()); //sort the key by time
            keyArray.sort();

            for (let i = keyArray.length - 1; i >= keyArray.length - 7; i++){
                Date.push(keyArray[i]);
                lengthOfWeek.push(dayHistory.get(keyArray[i]));
                sessionPerDay.push(dayNumber.get(keyArray[i]));
            }

        }
    });
}

function updateSunflower(){
    var num = 0; //it should be the information from session
    var user = firebase.auth().currentUser;
    var email;
    if (user != null){
        email = user.email;
    }
    chrome.runtime.sendMessage({command : "update_sunflower", sunflower : num, useremail : email}, (response) =>{
        if (response.message === "success") {
            window.location.replace('./temp.html');
        }
    });
}