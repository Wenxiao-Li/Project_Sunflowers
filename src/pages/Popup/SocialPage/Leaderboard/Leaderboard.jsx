import React, { Component } from 'react';
import { UserContext } from '../../User';
import sunflowerIcon from '../../../../assets/img/sunflowerIcon.jpg';
import { updateReactions } from './updateReactions';
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
  /*
    updateReactions() {
      console.log(this.reactions);
      if (this.reactions.indexOf(this.currentUser) === -1) {
        this.reactions.push(this.currentUser);
      } else {
        this.reactions.pop(this.currentUser);
      }
    }
    */
}

const Leaderboard = () => {
  const [leaderBoardComponents, setLBComponents] = React.useState([]);
  const [reactionsAvailable, setReactionsAvailable] = React.useState([]);
  const { user, snapshotData } = React.useContext(UserContext);

  const [querySnapshot, setQS] = React.useState([]);

  function getLBSnapshot(request, sender, senderResponse) {
    if (request.msg === 'query_snapshot') {
      console.log(request.qsnapshot);
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
        console.log('print: ', current);
        var leaderBoardComponent = new LeaderBoardComponent(
          current.user_name,
          current.email,
          current.score,
          current.reactions,
          user.displayName
        );
        currentReactionsAvailable = Object.keys(current.reactions);
        newLeaderBoardComponents.push(leaderBoardComponent);
      }

      currentReactionsAvailable.sort();
      setLBComponents(newLeaderBoardComponents);
      setReactionsAvailable(currentReactionsAvailable);
    };
    setArray(querySnapshot);

    //return unsubscribe;
  }, [querySnapshot]);
  const updateLeaderBoard = (friendReactedTo, keyReactedOn) => {
    console.log('Friend Reacted to ', friendReactedTo);
    console.log('Emoji Reacted on', keyReactedOn);
    var copy = [...leaderBoardComponents];
    var indexOffriend = copy.findIndex(
      (friend) => friend.email === friendReactedTo
    );
    console.log(indexOffriend);
    var reactionExists = copy[indexOffriend].reactions[keyReactedOn].indexOf(
      user.email
    );

    //copy[indexOffriend].reactions[keyReactedOn].push(user.email);
    updateReactions(user, friendReactedTo, reactionExists, keyReactedOn);

    console.log(copy);
    console.log(leaderBoardComponents);
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
      {friend.userName}
      {' ' + friend.score + 'x'}
      <img className="sunflower-icon" src={sunflowerIcon}></img>
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
  ));
  /*
    var leaderboardRendered = leaderBoardComponents.map((friend) => (
      <div key={friend.userName}>
        {friend.userName} Sunflowers = {friend.score}
        <button
          id={friend.userName}
          onClick={() => updateLeaderBoard(friend.userName)}
        >
          <img
            src={
              friend.reactions.indexOf(userName) === -1 ? unlikedicon : likedicon
            }
            style={{ width: 20, height: 20 }}
          ></img>
        </button>
        {friend.reactions.length}
      </div>
    ));
  */
  return (
    <div>
      <h1> Leaderboard</h1>
      {leaderboardRendered}
      <span>User Name: {userName}</span>
      <br />
      <span>Email: {email}</span>
    </div>
  );
};

export default Leaderboard;
