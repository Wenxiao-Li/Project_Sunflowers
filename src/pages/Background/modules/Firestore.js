import {db} from './FirebaseConfig';
var firebase = require('firebase').default;

export let dbHandle = () => { 
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(request.message)
        if (request.command === "set_name"){
            db.collection("user").doc(request.useremail).update({
                first_name : request.firstname,
                last_name : request.lastname
            })
            .then(() => {
                sendResponse ({message : "success"});
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });    
        }else if (request.message === "sign_in"){
            var user = request.user;
            var name = user.displayName.split(" ");

            db.collection('user').doc(user.email).get().then((docSnapshot) => {
                if (docSnapshot.exists) {
                    sendResponse ({message : "success"});
                } else {
                    db.collection("user").doc(user.email).set({
                        first_name : name[0],
                        last_name : name[1],
                        blacklist : [],
                        whitelist : []
                    })
                    .then(() => {
                        sendResponse ({message : "success"});
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                }
            });    
        }else if (request.command === "add_blacklist"){
            db.collection("user").doc(request.useremail).update({
                blacklist : firebase.firestore.FieldValue.arrayUnion(request.blacklist),
            })
            .then(() => {
                sendResponse ({message : "success"});
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });    
        }else if (request.command === "add_whitelist"){
            db.collection("user").doc(request.useremail).update({
                whitelist : firebase.firestore.FieldValue.arrayUnion(request.whitelist),
            })
            .then(() => {
                sendResponse ({message : "success"});
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });    
        }
        return true;
    }) 
};
