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
  deleteFriendHandle,
  deleteFriendMutualHandle,
  ViewNameHandle,
  friendRequestHandle,
} from './Friends';
import './Friends.css';

export default function FriendsPage() {
  const { snapshotData } = React.useContext(UserContext);

  const [friendList, setFriendList] = React.useState([]);

  React.useEffect(() => {
    if (snapshotData) {
      const friendEmailList = snapshotData.friends;
      const friendNameList = snapshotData.friendname;

      const tempList = [];
      friendEmailList.forEach((email, index) => {
        tempList.push({ email: email, name: friendNameList[index] });
      });
      setFriendList(tempList);
    }
  }, [snapshotData]);

  const onSubmitAddFriends = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    const friendEmail = formDataObj.addfriend;
    console.log(friendEmail);
    friendRequestHandle(friendEmail);
    // ViewNameHandle(friendEmail, function (response) {
    //   friendRequestHandle(friendEmail);
    // });
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
    <div >
      <div className="friends">
        <span> Friends </span>
      </div>

      <div className="addfriends">
        <span> Add Friends: </span>
      </div>

      <div className="sendadd">
        <Form onSubmit={onSubmitAddFriends}>
          <InputGroup>
            <FormControl
              placeholder="Enter the email to send friend request"
              name="addfriend"
            />
            <InputGroup.Append>
              <Button variant="info" type="submit">
                Send
            </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>

      <div className="list">
        <span font-weight="bold"> Friend List: </span>
        <ListGroup>
          {friendList.map((friend) => (
            <Friends key={friend} name={friend.name} email={friend.email} />
          ))}
        </ListGroup>
      </div>

    </div>
  );
}
