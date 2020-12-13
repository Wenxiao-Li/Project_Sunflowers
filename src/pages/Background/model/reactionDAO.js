import firebase, { db } from '../modules/firebaseconfig';
var leaderboardRef = db.collection('user');
export const updateReactions = (
    user,
    friendReactedTo,
    reactionExists,
    keyReactedOn,
    sendResponse
) => {
    if (reactionExists == -1) {
        //let reference = "reactions." + keyReactedOn;
        if (keyReactedOn == "0x1F496") {
            leaderboardRef.doc(friendReactedTo).update({

                "reactions.0x1F496": firebase.firestore.FieldValue.arrayUnion(user.email),
            })
                .then(() => {
                    sendResponse({ message: 'success' });
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                    sendResponse({ message: 'failure at dao' });
                });
        }
        else if (keyReactedOn == "0x1F525") {
            leaderboardRef.doc(friendReactedTo).update({

                "reactions.0x1F525": firebase.firestore.FieldValue.arrayUnion(user.email),
            })
                .then(() => {
                    sendResponse({ message: 'success' });
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                    sendResponse({ message: 'failure at dao' });
                });
        }
        else {
            leaderboardRef.doc(friendReactedTo).update({

                "reactions.0x1F603": firebase.firestore.FieldValue.arrayUnion(user.email),
            })
                .then(() => {
                    sendResponse({ message: 'success' });
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                    sendResponse({ message: 'failure at dao' });
                });
        }
    }
    else {
        //let reference = "reactions." + keyReactedOn;
        if (keyReactedOn == "0x1F496") {
            leaderboardRef.doc(friendReactedTo).update({

                "reactions.0x1F496": firebase.firestore.FieldValue.arrayRemove(user.email),
            })
                .then(() => {
                    sendResponse({ message: 'success' });
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                    sendResponse({ message: 'failure at dao' });
                });
        }
        else if (keyReactedOn == "0x1F525") {
            leaderboardRef.doc(friendReactedTo).update({

                "reactions.0x1F525": firebase.firestore.FieldValue.arrayRemove(user.email),
            })
                .then(() => {
                    sendResponse({ message: 'success' });
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                    sendResponse({ message: 'failure at dao' });
                });
        }
        else {
            leaderboardRef.doc(friendReactedTo).update({

                "reactions.0x1F603": firebase.firestore.FieldValue.arrayRemove(user.email),
            })
                .then(() => {
                    sendResponse({ message: 'success' });
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                    sendResponse({ message: 'failure at dao' });
                });
        }
    }

}
