import React from 'react';
import DisplaySession from './DisplaySession.jsx';
import './DisplaySession.css';
import UnauthPage from '../UnauthPage'
import { UserContext } from '../User'

const HomePage = () => {
  const { user } = React.useContext(UserContext)
  if (user) {
    return (
      <div className="page">
        <div>
          {' '}
          <DisplaySession />{' '}
        </div>
      </div>
    );
  }
  else {
    return <UnauthPage />;
  }
};

export default HomePage;
