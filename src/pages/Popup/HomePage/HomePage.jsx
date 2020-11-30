import React from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import SunflowerIcon from '../../../assets/img/sunflowerIcon.jpg';
import DisplaySession from './DisplaySession.jsx';
//import homeTab from '../../../assets/img/homeTab.png';
//import settingTab from '../../../assets/img/settingTab.png';
//import socialTab from '../../../assets/img/socialTab.png';
//import profileTab from '../../../assets/img/profileTab.png';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="Home" >
      <div className="bg">
        <img src={SunflowerBg} />
        <br />
      </div>
      <br />

      <div className="dis">
        <DisplaySession />
        <br />
      </div>
      <br />

      <div className="sficon">
        <b className="num"> 2 </b>
        <img src={SunflowerIcon} width="50" />
        <br />
      </div>
      <br />

      <div>
        <br />
        <br />
        <br />
        <b> You will get One Sunflower per 15 minutes </b>
        <br />
      </div>
      <br />

    </div>
  );
};

export default HomePage;
