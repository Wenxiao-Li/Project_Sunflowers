import React from 'react';
import { UserContext } from '../../User';
import {
  Button,
  Form,
  InputGroup,
  FormControl,
  ListGroup,
} from 'react-bootstrap';
import deleteIcon from '../../../../assets/img/deleteIcon.png';
import {
  addFriendHandle,
  deleteFriendHandle,
  deleteFriendMutualHandle,
  ViewNameHandle,
  friendRequestHandle,
} from './Friends';

export default function FriendsPage() {
  const { snapshotData } = React.useContext(UserContext);

  const friendEmailList = snapshotData.friends;
  const friendNameList = snapshotData.friendname;

  const friendList = [];
  friendEmailList.forEach((email, index) => {
    friendList.push({ email: email, name: friendNameList[index] });
  });

  const onSubmitAddFriends = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    const friendEmail = formDataObj.addfriend;
    console.log(friendEmail);
    ViewNameHandle(friendEmail, function (response) {
      //addFriendHandle(addfriendemail.current.value, response);
      friendRequestHandle(friendEmail);
    });
  };

  const Friends = ({ name, email }) => {
    let operation = () => {
      if (
        window.confirm(
          'Are you sure you want to unfriend with ' +
            name +
            ' with email: ' +
            email +
            '?'
        )
      ) {
        deleteFriendHandle(email, name);
        deleteFriendMutualHandle(email);
      }
    };
    return (
      <ListGroup.Item>
        {name} : {email}
        <img src={deleteIcon} onClick={operation} className="icon-pin-right" />
      </ListGroup.Item>
    );
  };

  return (
    <div className="friends">
      <h3> Friends </h3>
      <label> Add friends </label>
      <Form onSubmit={onSubmitAddFriends}>
        <InputGroup>
          <FormControl
            placeholder="Enter the email to send friend request"
            name="addfriend"
          />
          <InputGroup.Append>
            <Button variant="light" type="submit">
              Send
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <br />
      <span> Your friend list: </span>
      <ListGroup>
        {friendList.map((friend) => (
          <Friends key={friend} name={friend.name} email={friend.email} />
        ))}
      </ListGroup>
    </div>
  );
}
