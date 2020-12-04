import React from 'react';
import Leaderboard from './Leaderboard/Leaderboard.jsx';
import Friends from './Friends/Friends.jsx';
import Notifications from './Notifications/Notifications.jsx';
import UnauthPage from './UnauthPage';
import { AuthContext } from '../../../auth/Auth';

const SocialPage = () => {
  const [pageName, setPage] = React.useState('Leaderboard');

  const [friendsScore, setFriendsScore] = React.useState([]);

  const { user } = React.useContext(AuthContext);

  const components = {
    Leaderboard: <Leaderboard user={user} friendsScore={friendsScore} />,
    Friends: <Friends user={user} />,
    Notifications: <Notifications user={user} />,
  };

  // PLACEHOLDER: array which is used to render the leaderboard(should be replaced by the API Call to backend).
  // returns an array where each entry is
  // { userName: 'xyz', score: 12, reactions: ['userName1', 'userName2'] }
  var currentFriendsScoreArray = [
    {
      userName: 'Satyam',
      score: 12,
      reactions: ['Yitian', 'HaiHao'],
    },
    {
      userName: 'Yitian',
      score: 20,
      reactions: [],
    },
    {
      userName: 'HaiHao',
      score: 30,
      reactions: [],
    },
    {
      userName: 'Fei',
      score: 40,
      reactions: [],
    },
  ];

  React.useEffect(() => {
    //Sort the array returned.
    currentFriendsScoreArray.sort((a, b) => b.score - a.score);

    setFriendsScore(currentFriendsScoreArray);
  }, []);

  const showComponent = (componentName) => {
    setPage(componentName);
  };

  if (user) {
    return (
      <div className="page">
        <button onClick={() => showComponent('Leaderboard')}>
          Leaderboard
        </button>
        <button onClick={() => showComponent('Friends')}>Friends</button>
        <button onClick={() => showComponent('Notifications')}>
          Notifications
        </button>
        <div>{components[pageName]}</div>
      </div>
    );
  } else {
    return <UnauthPage />;
  }
};

export default SocialPage;
