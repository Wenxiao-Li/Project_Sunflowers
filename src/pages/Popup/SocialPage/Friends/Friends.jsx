import React, { Component } from 'react';
import { useEffect } from 'react';
import SunflowerBg from '../../../../assets/img/IMG_1277.jpg';
import firebase from '../../../Background/modules/firebaseconfig';
import { addFriendHandle, viewFriendslistHandle } from './Friends';
/*
class Friends extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };

    //this.firebaseRef = firebase.database().ref("Friends");
  }
  
  pushToFirebase(event) {
    const {friendemail} = this.state;
    const {useremail} = this.props.user.email;
    event.preventDefault();
    //this.firebaseRef.child(name).set({name});
    chrome.runtime.sendMessage({command: 'add_friend', useremail: useremail, friendemail: friendemail});
    this.setState({name: ''});
  }
  
  
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.firebaseRef.off();
  }

  render() {
    var useremail = 'undefined';
    var userName = 'undefined';
    var friends = 'undefined';

    if (this.props.user) {
      useremail = this.props.user.email;
      userName = this.props.user.displayName;
    }
    return (
      <div>
        <h1> Friends </h1>
        
        <label> Email </label>
        <input onChange= {e => this.setState({email: e.target.value})}/>
        <button onClick={this.pushToFirebase.bind(this)}> Add </button>
        <br />

        <span>Friends: {friends}</span>
        <br />
        <span>User Name: {userName}</span>
        <br />
        <span>Email: {useremail}</span>
      </div>
    );
  }
}

export default Friends;
*/
export default function FriendPage() {
  // Set States goes here
  const friendemail = React.useRef(null);

  /**
   * Description: Initializing States, do not pass function into useState
   * isBlockList: state
   * setBlockListBoolean: setState for isBlockList, this is async so be careful
   * param: initial value
   */
  //const [isBlockList, setBlockListBoolean] = React.useState(true);

  // use the return of useEffect for componentWillUnmount

  // Run after every re-render
  // React.useEffect(() => {});

  // Equivalent to componentDidMount and return = componentWillUnMount
  // React.useEffect(() => {}, []);

  const onSubmitFriends = (event) => {
    event.preventDefault();
    addFriendHandle(friendemail.current.value);
  };

  const showFriends = (event) => {
    viewFriendslistHandle();
  };


  return (
    <div className="Friends">
      <h1> Friends </h1>
      <br />
      <form onSubmit={onSubmitFriends}>
        <label>Add Friends</label>
        <input type="text" name="addfriend" ref={friendemail} required />
        <button type="submit">Add</button>
      </form>
      <br />
      <p> friends: </p>
      {showFriends}
    </div>
  );
}