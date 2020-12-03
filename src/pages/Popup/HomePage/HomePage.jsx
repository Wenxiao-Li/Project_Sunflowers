import React from 'react';
import SunflowerIcon from '../../../assets/img/sunflowerIcon.jpg';
import DisplaySession from './DisplaySession.jsx';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="Home" >

      <div className="disSS">
        <div> <DisplaySession /> </div>
      </div>

      <div className="sfIcon">
        <img src={SunflowerIcon} width="50" />
      </div>

      <div className="statement">
        <p> You will get One Sunflower per 15 minutes </p>
      </div>

    </div>
  );
};

export default HomePage;
