import React from 'react';
import DisplaySession from './DisplaySession.jsx';
import './DisplaySession.css';

const HomePage = () => {
  return (
    <div className="page">
      <div>
        {' '}
        <DisplaySession />{' '}
      </div>
    </div>
  );
};

export default HomePage;
