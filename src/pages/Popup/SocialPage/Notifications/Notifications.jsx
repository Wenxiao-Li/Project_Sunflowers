import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { UserContext } from '../../User';
import { addFriendHandle, ViewNameHandle } from '../Friends/Friends.js';
import {
  acceptFriendRequestHandle,
  deleteFriend2Handle,
  friendSuccessHandle,
} from './notif';
import addIcon from '../../../../assets/img/addIcon.png';
import deleteIcon from '../../../../assets/img/deleteIcon.png';
import './Notifications.css';


export default function NotificationPage() {
  const { snapshotData } = React.useContext(UserContext);

  const [requestList, setRequestList] = React.useState([]);

  React.useEffect(() => {
    if (snapshotData) {
      const requestEmailList = snapshotData.friend2;
      const requestNameList = snapshotData.friendname2;

      const tempList = [];
      requestEmailList.forEach((email, index) => {
        tempList.push({ email: email, name: requestNameList[index] });
      });
      setRequestList(tempList);
    }
  }, [snapshotData]);

  const FriendRequests = ({ name, email }) => {
    let accept = () => {
      if (
        window.confirm(
          'If accepted, both of you will be able to see each other' +
          "'s ranking on leaderboard and are able to give reactions to each other."
        )
      ) {
        acceptFriendRequestHandle(email, name);
      }
    };
    let reject = () => {
      if (
        window.confirm('You are trying to reject this friend request, confirm?')
      ) {
        deleteFriend2Handle(email, name, () => { });
        // ViewNameHandle(email, function (response) {
        // });
      }
    };
    return (
      <ListGroup.Item>
        {name} : {email}
        <img src={addIcon} onClick={accept} className="icon-pin-right" />
        <img src={deleteIcon} onClick={reject} className="icon-pin-right" />
      </ListGroup.Item>
    );
  };

  return (
    <div>
      <div className="friendsrequest">
        <span> Friend Requests </span>
      </div>

      <div className="request">
        <span> Requests: </span>
        <ListGroup>
          {requestList.map((request) => (
            <FriendRequests
              key={request}
              name={request.name}
              email={request.email}
            />
          ))}
        </ListGroup>
      </div>

    </div >
  );
}
