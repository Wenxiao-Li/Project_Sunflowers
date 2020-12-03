import React, { Component } from 'react';
import firebase, { db } from '../../../Background/modules/firebaseconfig';
import SunflowerBg from '../../../../assets/img/IMG_1277.jpg';

class Leaderboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      status: [],
      friendsScore: [],
    }
    var user = this.props.user;
    var leaderboardRef = db.collection('user');
    if (user) {
      //let currentFriendsScoreArray = new Array();
      //console.log(currentFriendsScoreArray);
      leaderboardRef.doc(user.email).onSnapshot(function (doc) {
        let currentFriendsScoreArray = new Array();
        let items = doc.data().friend;
        //console.log(items);
        for (var i = 0; i < items.length; i++) {
          var userID = items[i];
          leaderboardRef.doc(userID).get().then(function (doc) {
            if (doc.exists) {
              let friend = {
                userName: doc.data().first_name,
                score: doc.data().user_flower
              };
              //console.log(friend);
              currentFriendsScoreArray.push(friend);
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          }).catch(function (error) {
            console.log("Error getting document:", error);

          });
        }
        //console.log('setState')
        //console.log(currentFriendsScoreArray);
        this.setState({
          friendsScore: currentFriendsScoreArray,
        })
      }.bind(this))
      console.log(this.state.friendsScore);
    }
  }

  componentDidMount() {
    this._isMounted = true;

  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.friendsScore != prevProps.friendsScore) {
      this.setState({
        status: (this.state.friendsScore)
      })
    }
    //console.log('didupdate');
    //console.log('did update', this.state.friendsScore);
  }

  render() {

    console.log('render', this.state.friendsScore)

    var email = 'undefined';
    var userName = 'undefined';
    if (this.props.user) {
      email = this.props.user.email;
      userName = this.props.user.displayName;
    }




    return (
      <div>
        <h1> Leaderboard</h1>
        <div> {this.state.friendsScore.map(
          friend => <div key={friend.userName}>{friend.userName}, Sunflowers = {friend.score}<br /></div>)}</div>

        <span>User Name: {userName}</span>
        <br />
        <span>Email: {email}</span>
      </div>
    );
  }
}

export default Leaderboard;