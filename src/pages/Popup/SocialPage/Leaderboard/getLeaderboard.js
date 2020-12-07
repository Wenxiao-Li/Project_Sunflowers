import firebase, { db } from '../../../Background/modules/firebaseconfig';
var leaderboardRef = db.collection('user');
export function getLeaderboard(user, callback) {

    leaderboardRef.doc(user.email).onSnapshot(function (doc) {
        let currentFriendsScoreArray = new Array();
        let items = doc.data().friends;
        items.push(user.email);
        //console.log(items);

        leaderboardRef.where(firebase.firestore.FieldPath.documentId(), 'in', items).onSnapshot(function (querySnapshot) {
            currentFriendsScoreArray = [];
            console.log(doc.data().reactions);
            querySnapshot.forEach(function (doc) {
                let friend = {
                    userName: doc.data().first_name,
                    email: doc.id,
                    score: doc.data().user_flower,
                    reactions: doc.data().reactions
                };
                console.log(friend);
                currentFriendsScoreArray.push(friend);



            });
            callback(currentFriendsScoreArray);

        })
    })

}
//export const unsubscribe = () => { unsubscriber() };