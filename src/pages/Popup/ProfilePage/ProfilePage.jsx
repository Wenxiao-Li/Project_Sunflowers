import React from 'react';
import UserProfile from './UserProfile/UserProfile.jsx';
import SessionHistory from './SessionHistory/SessionHistory.jsx';
import SigninPage from './SigninPage';
import { AuthContext } from '../../../auth/Auth';
import './UserProfile/UserProfile.css';

const ProfilePage = () => {
  const [pageName, setPage] = React.useState('UserProfile');

  const { user } = React.useContext(AuthContext);

  const components = {
    UserProfile: <UserProfile user={user} toHistory={toHistory} />,
    SessionHistory: <SessionHistory user={user} toProfile={toProfile} />,
  };

  const showComponent = (componentName) => {
    setPage(componentName);
  };

  const toHistory = () => {
    showComponent('SessionHistory');
  };

  const toProfile = () => {
    showComponent('UserProfile');
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
