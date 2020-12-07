import React, { Component } from 'react';
import SunflowerBg from '../../../../assets/img/IMG_1277.jpg';
import { addFriendHandle, viewFriendlistHandle, ViewNameHandle } from '../Friends/Friends.js';
import { viewFriendRequestHandle, deleteFriend2Handle, friendSuccessHandle } from './notif'
/*
class Notifications extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    var email = 'undefined';
    var userName = 'undefined';
    if (this.props.user) {
      email = this.props.user.email;
      userName = this.props.user.displayName;
    }
    return (
      <div>
        <h1> Notifications</h1>
        <span>User Name: {userName}</span>
        <br />
        <span>Email: {email}</span>
      </div>
    );
  }
}
export default Notifications;
*/
export default function NotificationPage() {
  // Set States goes here
  const addfriendemail = React.useRef(null);
  const deletefriendemail = React.useRef(null);
  //const friendList = React.useRef(null);
  const acceptRequest = React.useRef(null);
  const rejectRequest = React.useRef(null);
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

  const onSubmitAcceptRequest = (event) => {
    event.preventDefault();
    ViewNameHandle(acceptRequest.current.value, function (response) {
      deleteFriend2Handle(acceptRequest.current.value, response);
      addFriendHandle(acceptRequest.current.value, response);
      friendSuccessHandle(acceptRequest.current.value);
      viewFriendRequestHandle(displayFriends);
    });
    viewFriendRequestHandle(displayFriends);
  };

  const onSubmitRejectRequest = (event) => {
    event.preventDefault();
    ViewNameHandle(rejectRequest.current.value, function (response) {
      deleteFriend2Handle(rejectRequest.current.value, response);
      viewFriendRequestHandle(displayFriends);
    });
    viewFriendRequestHandle(displayFriends);
  };

  const showFriendRequests = (event) => {
    viewFriendRequestHandle(displayFriends);
  };

  const displayFriends = (friendList) => {
    setFriendList(friendList);
  };

  const Email = (props) => {
    return <li> {props.text}</li>;
  };

  return (
    <div className="Friends">
      <h1> Friend Requests </h1>
      <br />
      <button onClick={showFriendRequests}> showFriendRequests </button>
      <br />
      <form onSubmit={onSubmitAcceptRequest}>
        <input type="text" name="acceptRequest" ref={acceptRequest} required />
        <button type="submit"> Accept Request </button>
      </form>
      <form onSubmit={onSubmitRejectRequest}>
        <input type="text" name="rejectRequest" ref={rejectRequest} required />
        <button type="submit"> Reject Request </button>
      </form>
      <span> Requests: </span>
      <ul>
        {nameList.map(email => (
          <Email key={email} text={email} />
        ))}
      </ul>
    </div >
  );
}