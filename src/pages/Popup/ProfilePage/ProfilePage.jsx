import React from 'react';
import UserProfile from './UserProfile/UserProfile.jsx';
import SessionHistory from './SessionHistory/SessionHistory.jsx';
import SigninPage from './SigninPage';
import { UserContext } from '../User';

const ProfilePage = () => {
  const [pageName, setPage] = React.useState('UserProfile');

  const { user, snapshotData } = React.useContext(UserContext);

  const toHistory = () => {
    showComponent('SessionHistory');
  };

  const toProfile = () => {
    showComponent('UserProfile');
  };

  const showComponent = (componentName) => {
    setPage(componentName);
  };

  const components = {
    UserProfile: (
      <UserProfile
        user={user}
        numFlower={(snapshotData && snapshotData.user_flower) || 0}
        toHistory={toHistory}
      />
    ),
    SessionHistory: <SessionHistory user={user} toProfile={toProfile} />,
  };

  if (user) {
    return (
      <div className="page">
        <div>{components[pageName]}</div>
      </div>
    );
  } else {
    return <SigninPage />;
  }
};

export default ProfilePage;
