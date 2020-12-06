import firebase, { db } from '../../../Background/modules/firebaseconfig';
var leaderboardRef = db.collection('user');
export function getLeaderboard(user, callback) {

    leaderboardRef.doc(user.email).onSnapshot(function (doc) {
        let currentFriendsScoreArray = new Array();
        let items = doc.data().friend;
        //console.log(items);

        leaderboardRef.where(firebase.firestore.FieldPath.documentId(), 'in', items).onSnapshot(function (querySnapshot) {
            currentFriendsScoreArray = [];
            querySnapshot.forEach(function (doc) {
                let friend = {
                    userName: doc.data().first_name,
                    score: doc.data().user_flower
                };
                console.log(friend);
                currentFriendsScoreArray.push(friend);



            });
            callback(currentFriendsScoreArray);

        })
    })

}
export const unsubscribe = () => { leaderboardRef() };