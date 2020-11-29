import { db } from './firebaseconfig';
var firebase = require('firebase').default;

const updateName = (userEmail, callback) => {
    db.collection('user').doc(userEmail).onSnapshot((snapshot) => {
        console.log("snapshot", snapshot.data())
    }).then(() => {
        sendResponse({ message: "success" })
    }).catch((error) => {
        console.error('Error writing document: ', error);
    });
};

const setName = (userEmail, firstName, lastName, callback) => {
    db.collection('user').doc(userEmail).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            callback();
        } else {
            db.collection('user').doc(userEmail).set({
                first_name: firstName,
                last_name: lastName,
                blacklist: [],
                whitelist: [],
            }).then(() => {
                callback();
            }).catch((error) => {
                console.error('Error writing document: ', error);
            });
        }
    });
}