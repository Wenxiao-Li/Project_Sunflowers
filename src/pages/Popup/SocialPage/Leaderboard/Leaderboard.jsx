import React, { Component } from 'react';
import likedicon from '../../../../assets/img/liked.png';
import unlikedicon from '../../../../assets/img/unliked.png';
import { AuthContext } from '../../../../auth/Auth';
import sunflowerIcon from '../../../../assets/img/sunflowerIcon.jpg';
import { getLeaderboard, unsubscribe } from './getLeaderboard';
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

  const { user } = React.useContext(AuthContext);

  function getLBSnapshot(request, sender, senderResponse) {
    if (request.msg === 'query_snapshot') {
      console.log(request.qsnapshot);
    }
  }

  React.useEffect(() => {
    chrome.runtime.sendMessage({
      msg: 'start_lblisten',
    });
    chrome.runtime.onMessage.addListener(getLBSnapshot);
    return () => {
      chrome.runtime.sendMessage({
        msg: 'close_lblisten',
      });
      chrome.runtime.onMessage.removeListener(getLBSnapshot);
    };
  }, []);

  React.useEffect(() => {
    const setArray = (inputArray) => {
      var currentFriendsScoreArray = [];
      currentFriendsScoreArray = inputArray;
      currentFriendsScoreArray.sort((a, b) => b.score - a.score);

      var newLeaderBoardComponents = [];
      for (var i = 0; i < currentFriendsScoreArray.length; i++) {
        var current = currentFriendsScoreArray[i];
        console.log('print: ', current);
        var leaderBoardComponent = new LeaderBoardComponent(
          current.userName,
          current.email,
          current.score,
          current.reactions,
          user.displayName
        );
        newLeaderBoardComponents.push(leaderBoardComponent);
      }
      setLBComponents(newLeaderBoardComponents);
    };
    getLeaderboard(user, setArray);

    //return unsubscribe;
  }, []);
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
  /*
  const updateLeaderBoard = (name) => {
    var nameReactedTo = name;
    console.log(nameReactedTo);
    var copy = leaderBoardComponents.slice();
    for (var i = 0; i < copy.length; i++) {
      if (copy[i].userName === nameReactedTo) {
        if (copy[i].reactions.indexOf(copy[i].currentUser) === -1) {
          console.log('Reaction added for user', nameReactedTo);
          copy[i].reactions.push(copy[i].currentUser);
        } else {
          console.log('Reaction removed for user', nameReactedTo);
          copy[i].reactions.pop(copy[i].currentUser);
        }
      }
    }
    setLBComponents(copy);
  };
  */
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
          {Object.entries(friend.reactions).map(([key, arrayOfReacts]) => (
            <button
              key={key}
              value={friend.email}
              className={
                arrayOfReacts.indexOf(user.email) == -1 ? 'unreacted' : 'reacted'
              }
              onClick={(e) => updateLeaderBoard(e.target.value, key)}
            >
              {String.fromCodePoint(key)} {arrayOfReacts.length}
            </button>
          ))}
        </div>
      </div>
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
