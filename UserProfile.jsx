import React, { Component } from 'react';
import SunflowerBg from '../../../../assets/img/IMG_1277.jpg';
import { signOutHandle } from '../signin.js';
import firebase, { db } from '../../../Background/modules/firebaseconfig';


class UserProfile extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    
    this.state = {
      score : 0
    }
    
    var user = this.props.user;
    var profileRef = db.collection('user');
    if(user){
      var num = 0;
      profileRef.doc(user.email).onSnapshot(function (doc){
        num = doc.data().user_flower;
        //console.log(num);
        this.setState({score : num});
      }.bind(this));
    } 
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  viewflower = () =>{
    viewtotalsunflowerHandle();
    console.log("it is viewing sunflower number");
  };

  render() {
    var email = 'undefined';
    var userName = 'undefined';
    var sunflower = 10;
    if (this.props.user) {
      email = this.props.user.email;
      userName = this.props.user.displayName;
      sunflower = this.state.score;
    }
    return (
      <div>
        <img src={SunflowerBg} />
        <h1 id="page-name">You are signed in</h1>
        <h3> Account Details</h3>
        <span>User Name: {userName}</span>
        <br />
        <span>Email: {email}</span>
        <br />
        <span>Total Sunflower: {sunflower}</span>
        <br />
        <button onClick={() => this.props.toHistory()}>
          {' '}
          Session History{' '}
        </button>
        <br />
        <button id="sign_out" onClick={signOutHandle}>
          Sign Out
        </button>
      </div>
    );
  }
}

export default UserProfile;
