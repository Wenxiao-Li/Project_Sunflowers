import React from 'react';
import Leaderboard from './Leaderboard/Leaderboard.jsx';
import Friends from './Friends/Friends.jsx';
import Notifications from './Notifications/Notifications.jsx';
import UnauthPage from './UnauthPage';
import { AuthContext } from '../../../auth/Auth';

const SocialPage = () => {
  const [pageName, setPage] = React.useState('Leaderboard');

  const { user } = React.useContext(AuthContext);

  const components = {
    Leaderboard: <Leaderboard />,
    Friends: <Friends user={user} />,
    Notifications: <Notifications user={user} />,
  };

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
