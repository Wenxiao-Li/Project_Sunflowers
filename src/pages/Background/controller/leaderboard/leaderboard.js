let isInLeaderboard = false;

export function setLeaderboardStat(boolVal) {
  isInLeaderboard = boolVal;
}

export function getLeaderboardStat() {
  return isInLeaderboard;
}

export function sendLBFriendsSnapshot(querysnapshot) {
  let snapshotArr = [];
  let size = querysnapshot.size;
  querysnapshot.forEach(function (doc) {
    var docData = doc.data();
    var data = {
      user_name: docData.first_name + ' ' + docData.last_name,
      score: docData.user_flower,
      reactions: docData.reactions,
      email: doc.id,
    };
    snapshotArr = snapshotArr.concat(data);
    size = size - 1;
    if (size === 0) {
      var fields = {
        msg: 'query_snapshot',
        qsnapshot: snapshotArr,
      };
      chrome.runtime.sendMessage(fields);
    }
  });
}
