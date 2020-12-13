import React, { Component } from 'react';
import { UserContext } from '../../User';
import sunflowerIcon from '../../../../assets/img/sunflowerIcon.jpg';
import { updateReactionHandle } from './updateReactions';
import './Leaderboard.css';
// A leaderboard entry consists of userName, score, and reactions. (Child of Leaderboard)
class LeaderBoardComponent {
  constructor(userName, email, score, reactions, currentUser) {
    this.userName = userName;
    this.email = email;
    this.score = score;
    this.reactions = reactions;
    this.currentUser = currentUser;
  }

}

const Leaderboard = () => {
  const [leaderBoardComponents, setLBComponents] = React.useState([]);
  const [reactionsAvailable, setReactionsAvailable] = React.useState([]);
  const { user, snapshotData } = React.useContext(UserContext);

  const [querySnapshot, setQS] = React.useState([]);

  function getLBSnapshot(request, sender, senderResponse) {
    if (request.msg === 'query_snapshot') {
      //console.log(request.qsnapshot);
      setQS(request.qsnapshot);
    }
  }

  React.useEffect(() => {
    chrome.runtime.sendMessage({
      msg: 'enter_leaderboard',
    });
    chrome.runtime.onMessage.addListener(getLBSnapshot);
    return () => {
      chrome.runtime.sendMessage({
        msg: 'exit_leaderboard',
      });
      chrome.runtime.onMessage.removeListener(getLBSnapshot);
    };
  }, []);

  React.useEffect(() => {
    const setArray = (inputArray) => {
      var currentReactionsAvailable = [];
      var currentFriendsScoreArray = [];
      currentFriendsScoreArray = inputArray;
      currentFriendsScoreArray.sort((a, b) => b.score - a.score);

      var newLeaderBoardComponents = [];
      for (var i = 0; i < currentFriendsScoreArray.length; i++) {
        var current = currentFriendsScoreArray[i];

        var leaderBoardComponent = new LeaderBoardComponent(
          current.user_name,
          current.email,
          current.score,
          current.reactions,
          user.displayName
        );
        if (current.reactions && current.user_name && current.email && current.score
        ) {
          currentReactionsAvailable = Object.keys(current.reactions);
          newLeaderBoardComponents.push(leaderBoardComponent);
        }
        else {
          console.log("missing fields");
        }
      }

      currentReactionsAvailable.sort();
      setLBComponents(newLeaderBoardComponents);
      setReactionsAvailable(currentReactionsAvailable);
    };
    setArray(querySnapshot);

    //return unsubscribe;
  }, [querySnapshot]);
  const updateLeaderBoard = (friendReactedTo, keyReactedOn) => {
    var copy = [...leaderBoardComponents];
    var indexOffriend = copy.findIndex(
      (friend) => friend.email === friendReactedTo
    );
    var reactionExists = copy[indexOffriend].reactions[keyReactedOn].indexOf(
      user.email
    );


    updateReactionHandle(user, friendReactedTo, reactionExists, keyReactedOn);


    setLBComponents(copy);
  };

  var email = 'undefined';
  var userName = 'undefined';
  if (user) {
    email = user.email;
    userName = user.displayName;
  }
  var leaderboardRendered = leaderBoardComponents.map((friend) => (
    <div key={friend.userName}>
      <div className="leaderboard-entry">
        <div className="user-name">
          {friend.userName}
        </div>
        <div className="sunflower-entry">
          Sunflower: {' ' + friend.score}
          <img className="sunflower-icon" src={sunflowerIcon}></img>
        </div>
        <div className="button-right">
          {reactionsAvailable.map((key) => (
            <button
              key={key}
              value={friend.email}
              className={
                friend.reactions[key].indexOf(user.email) == -1 ? 'unreacted' : 'reacted'
              }
              onClick={(e) => updateLeaderBoard(e.target.value, key)}
            >
              {String.fromCodePoint(key)} {friend.reactions[key].length}
            </button>
          ))}
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <h1 className="h1">Leaderboard</h1>
      <div className="user-info">
        <span>User Name: {userName}</span>
        <br />
        <span>Email: {email}</span>
      </div>
      <br />
      {leaderboardRendered}
    </div>
  );
};

export default Leaderboard;
