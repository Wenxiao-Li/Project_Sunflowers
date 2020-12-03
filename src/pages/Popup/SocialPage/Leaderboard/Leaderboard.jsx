import React, { Component } from 'react';
import SunflowerBg from '../../../../assets/img/IMG_1277.jpg';
import likedicon from '../../../../assets/img/liked.png';
import unlikedicon from '../../../../assets/img/unliked.png';

// A leaderboard entry consists of userName, score, and reactions. (Child of Leaderboard)
class LeaderBoardComponent {
  constructor(userName, score, reactions, currentUser) {
    this.userName = userName;
    this.score = score;
    this.reactions = reactions;
    this.currentUser = currentUser;
  }

  updateReactions() {
    console.log(this.reactions);
    if (this.reactions.indexOf(this.currentUser) === -1) {
      this.reactions.push(this.currentUser);
    } else {
      this.reactions.pop(this.currentUser);
    }
  }
}

class Leaderboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    var newLeaderBoardComponents = [];
    for (var i = 0; i < this.props.friendsScore.length; i++) {
      var current = this.props.friendsScore[i];
      var leaderBoardComponent = new LeaderBoardComponent(current.userName, current.score, current.reactions, this.props.user.displayName);
      newLeaderBoardComponents.push(leaderBoardComponent);
    }
    this.state = {
      leaderBoardComponents: []
    };

    this.state.leaderBoardComponents = newLeaderBoardComponents;
    this.updateLeaderBoard = this.updateLeaderBoard.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // If a reaction happends updates the leaderboard.
  updateLeaderBoard(event) {
    var nameReactedTo = event.target.id;
    var copy = this.state.leaderBoardComponents;
    for (var i = 0; i < copy.length; i++) {
      if (copy[i].userName === nameReactedTo) {
        if (copy[i].reactions.indexOf(copy[i].currentUser) === -1) {
          console.log("Reaction added for user", nameReactedTo);
          copy[i].reactions.push(copy[i].currentUser);
        } else {
          console.log("Reaction removed for user", nameReactedTo);
          copy[i].reactions.pop(copy[i].currentUser);
        }
      }

      this.setState({
        leaderBoardComponents: copy,
      })
    }

  }

  render() {
    var email = 'undefined';
    var userName = 'undefined';
    if (this.props.user) {
      email = this.props.user.email;
      userName = this.props.user.displayName;
    }

    var buttonStyle = {
      width: 20,
      height: 20
    }

    var leaderboardRendered = this.state.leaderBoardComponents.map(
      friend => <div key={friend.userName}>
        {friend.userName} Sunflowers = {friend.score}
        <button id={friend.userName} onClick={this.updateLeaderBoard} style={{ background: 'none', border: 'none' }} >
          <img id={friend.userName} onPress={this.updateLeaderBoard} src={friend.reactions.indexOf(userName) === -1 ? unlikedicon : likedicon} alt="buttonImg" style={{ width: 20, height: 20, "pointerEvents": "all" }}>
          </img>
        </button>
        {friend.reactions.length}
      </div>
    );

    return (
      <div>
        <h1> Leaderboard</h1>
        {leaderboardRendered}
        <span>User Name: {userName}</span>
        <br />
        <span>Email: {email}</span>
      </div >
    );
  }
}

export default Leaderboard;
