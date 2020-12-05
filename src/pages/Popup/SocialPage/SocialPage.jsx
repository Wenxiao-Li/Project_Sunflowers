import React from 'react';
import Leaderboard from './Leaderboard/Leaderboard.jsx';
import Friends from './Friends/Friends.jsx';
import Notifications from './Notifications/Notifications.jsx';
import UnauthPage from './UnauthPage';
import { AuthContext } from '../../../auth/Auth';

import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

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
        <ToggleButtonGroup
          type="radio"
          name="value"
          value={pageName}
          onChange={setPage}
          style={{ width: '100%' }}
        >
          <ToggleButton
            variant="toggle"
            value={'Leaderboard'}
            style={{ width: '33%' }}
          >
            Leaderboard
          </ToggleButton>
          <ToggleButton
            variant="toggle"
            value={'Friends'}
            style={{ width: '33%' }}
          >
            Friends
          </ToggleButton>
          <ToggleButton
            variant="toggle"
            value={'Notifications'}
            style={{ width: '33%' }}
          >
            Notifications
          </ToggleButton>
        </ToggleButtonGroup>
        <div>{components[pageName]}</div>
      </div>
    );
  } else {
    return <UnauthPage />;
  }
};

export default SocialPage;
