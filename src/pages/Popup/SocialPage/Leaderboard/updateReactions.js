import firebase, { db } from '../../../Background/modules/firebaseconfig';
var leaderboardRef = db.collection('user');
export function updateReactions(user, friendReactedTo, reactionExists, keyReactedOn) {
  if (reactionExists == -1) {
    //let reference = "reactions." + keyReactedOn;
    if (keyReactedOn == "0x1F496") {
      leaderboardRef.doc(friendReactedTo).update({

        "reactions.0x1F496": firebase.firestore.FieldValue.arrayUnion(user.email),
      })
    }
    else if (keyReactedOn == "0x1F525") {
      leaderboardRef.doc(friendReactedTo).update({

        "reactions.0x1F525": firebase.firestore.FieldValue.arrayUnion(user.email),
      })
    }
    else {
      leaderboardRef.doc(friendReactedTo).update({

        "reactions.0x1F603": firebase.firestore.FieldValue.arrayUnion(user.email),
      })
    }
  }
  else {
    //let reference = "reactions." + keyReactedOn;
    if (keyReactedOn == "0x1F496") {
      leaderboardRef.doc(friendReactedTo).update({

        "reactions.0x1F496": firebase.firestore.FieldValue.arrayRemove(user.email),
      })
    }
    else if (keyReactedOn == "0x1F525") {
      leaderboardRef.doc(friendReactedTo).update({

        "reactions.0x1F525": firebase.firestore.FieldValue.arrayRemove(user.email),
      })
    }
    else {
      leaderboardRef.doc(friendReactedTo).update({

        "reactions.0x1F603": firebase.firestore.FieldValue.arrayRemove(user.email),
      })
    }
  }

}
