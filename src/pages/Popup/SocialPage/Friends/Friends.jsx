import React, { Component } from 'react';
import SunflowerBg from '../../../../assets/img/IMG_1277.jpg';
import { AuthContext } from '../../../../auth/Auth';

const ACCEPTED_STATUS_STRING = "Accepted";
const PENDING_STATUS_STRING = "Pending";
const CONFIRM_REMOVE_STATUS_STRING = "Confirm Remove";

class FriendComponent {
  constructor(userName, status, currentUser) {
    this.userName = userName;
    this.status = status;
    this.currentUser = currentUser;
  }
};

const friends = () => {

  const [friendComponents, setFriendComponents] = React.useState([]);

  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    // Replace with the database call to get the friends.
    var currentFriendsArray = [
      {
        userName: 'Satyam',
        status: ACCEPTED_STATUS_STRING
      },
      {
        userName: 'Yitian',
        status: ACCEPTED_STATUS_STRING
      },
      {
        userName: 'HaiHao',
        status: ACCEPTED_STATUS_STRING
      },
      {
        userName: 'Xinyue',
        status: PENDING_STATUS_STRING
      },
      {
        userName: 'Zhirong',
        status: PENDING_STATUS_STRING
      }
    ];

    var newFriendsComponent = []
    for (var i = 0; i < currentFriendsArray.length; i++) {
      var current = currentFriendsArray[i];
      var friendComponent = new FriendComponent(
        current.userName,
        current.status,
        user.displayName
      );
      newFriendsComponent.push(friendComponent);
    }
    setFriendComponents(newFriendsComponent);
  }, []);

  const updateFriends = (name, typeOfAction = CONFIRM_REMOVE_STATUS_STRING) => {
    var copy = friendComponents.slice();
    var index = copy.findIndex(user => {
      if (user.userName === name) {
        return true;
      }
    });

    if (index !== -1) {
      if (copy[index].status === ACCEPTED_STATUS_STRING) {
        copy[index].status = CONFIRM_REMOVE_STATUS_STRING;
      } else {
        if (typeOfAction === CONFIRM_REMOVE_STATUS_STRING) {
          delete copy[index];
          copy.splice(index, 1);
        } else {
          copy[index].status = ACCEPTED_STATUS_STRING;
        }
      }
    }

    setFriendComponents(copy);
  };

  var friendsRendered = friendComponents.map((friend) => (
    <div key={friend.userName}>
      {friend.userName}
      <button
        id={friend.userName}
        onClick={() => updateFriends(friend.userName)}
        disabled={friend.status === PENDING_STATUS_STRING}
      >
        {friend.status === ACCEPTED_STATUS_STRING && "Remove Friend"}
        {friend.status === PENDING_STATUS_STRING && PENDING_STATUS_STRING}
        {friend.status === CONFIRM_REMOVE_STATUS_STRING && CONFIRM_REMOVE_STATUS_STRING}
      </button>
      {friend.status === CONFIRM_REMOVE_STATUS_STRING && <button id="Cancel" onClick={e => updateFriends(friend.userName, e.target.id)}>Cancel</button>}
    </div>
  ));

  const addFriend = () => {
    console.log("Adding a friend");
  }

  return (
    <div>
      <h1> Friends </h1>
      <button onClick={() => addFriend}> Add a Friend </button>
      <br />
      {friendsRendered}
      <span>User Name: {user.displayName}</span>
      <br />
      <span>Email: {user.email}</span>
    </div>
  );
}

export default friends;
