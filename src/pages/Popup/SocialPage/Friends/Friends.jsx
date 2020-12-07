import React, { Component } from 'react';
import { useEffect } from 'react';
import SunflowerBg from '../../../../assets/img/IMG_1277.jpg';
import firebase from '../../../Background/modules/firebaseconfig';
import { addFriendHandle, deleteFriendHandle, viewFriendlistHandle, ViewNameHandle, friendRequestHandle } from './Friends';
/*
class Friends extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
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
        <span>User Name: {userName}</span>
        <br />
        <span>Email: {useremail}</span>
      </div>
    );
  }
}
export default Friends;
*/

export default function FriendsPage() {
  // Set States goes here
  const addfriendemail = React.useRef(null);
  const deletefriendemail = React.useRef(null);
  //const friendList = React.useRef(null);
  const [nameList, setFriendList] = React.useState([]);

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

  const onSubmitAddFriends = (event) => {
    event.preventDefault();
    ViewNameHandle(addfriendemail.current.value, function (response) {
      //addFriendHandle(addfriendemail.current.value, response);
      friendRequestHandle(addfriendemail.current.value);
      viewFriendlistHandle(displayFriends);
    });
    viewFriendlistHandle(displayFriends);
  };

  const onSubmitDeleteFriends = (event) => {
    event.preventDefault();
    ViewNameHandle(deletefriendemail.current.value, function (response) {
      deleteFriendHandle(deletefriendemail.current.value, response);
      viewFriendlistHandle(displayFriends);
    });
    viewFriendlistHandle(displayFriends);
  };

  const showFriends = (event) => {
    viewFriendlistHandle(displayFriends);
  };

  const displayFriends = (friendList) => {
    setFriendList(friendList);
  };

  const Email = (props) => {
    return <li> {props.text}</li>;
  };

  return (
    <div className="Friends">
      <h1> Friends </h1>
      <br />
      <form onSubmit={onSubmitAddFriends}>
        <label>Add Friends</label>
        <input type="text" name="addfriend" ref={addfriendemail} required />
        <button type="submit"> Add </button>
      </form>
      <form onSubmit={onSubmitDeleteFriends}>
        <label>Delete Friends</label>
        <input type="text" name="addfriend" ref={deletefriendemail} required />
        <button type="submit"> Delete </button>
      </form>
      <br />
      <button onClick={showFriends}> showFriends </button>
      <span> friends: </span>
      <ul>
        {nameList.map(email => (
          <Email key={email} text={email} />
        ))}
      </ul>
    </div >
  );
}