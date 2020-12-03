import React, { Component } from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import Leaderboard from './Leaderboard/Leaderboard.jsx';
import Friends from './Friends/Friends.jsx';
import Notifications from './Notifications/Notifications.jsx';
//import { dbRef } from '../../Background/modules/FirebaseConfig';
import firebase, { db } from '../../Background/modules/firebaseconfig';
class SocialPage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      displayedComponent: 'Leaderboard',

    };

    this.showComponent = this.showComponent.bind(this);
    //this.showComponent('Leaderboard');
  }

  componentDidMount() {
    this._isMounted = true;
    // PLACEHOLDER: array which is used to render the leaderboard(should be replaced by the API Call to backend).
    var user = this.props.user;
    var leaderboardRef = db.collection('user');
    /*
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
    }
    //console.log(currentFriendsScoreArray);
    /*

    var currentFriendsScoreArray = [
      {
        userName: 'Satyam',
        score: 12
      },
      {
        userName: 'Yitian',
        score: 20
      },
      {
        userName: 'HaiHao',
        score: 30
      },
      {
        userName: 'Fei',
        score: 40
      }
    ];
*/
    //Sort the array returned.
    //currentFriendsScoreArray.sort((a, b) => b.score - a.score);


  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  showComponent(componentName) {
    this.setState({ displayedComponent: componentName });
  }

  render() {
    const components = {
      Leaderboard: <Leaderboard user={this.props.user} />,
      Friends: <Friends user={this.props.user} />,
      Notifications: <Notifications user={this.props.user} />,
    };
    return (
      <div>
        <img src={SunflowerBg} />
        <br />
        <button onClick={() => this.showComponent('Leaderboard')}>
          Leaderboard
        </button>
        <button onClick={() => this.showComponent('Friends')}>Friends</button>
        <button onClick={() => this.showComponent('Notifications')}>
          Notifications
        </button>
        <div>{components[this.state.displayedComponent]}</div>
      </div>
    );
  }
}

export default SocialPage;