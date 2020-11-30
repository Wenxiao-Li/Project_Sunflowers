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

      <div className="logo">
        <img src={SunflowerBg} />
      </div>

      <div className="disSS">
        <div> <DisplaySession /> </div>
      </div>

      <div className="sfIcon">
        <b> 2 </b>
        <img src={SunflowerIcon} width="50" />
      </div>

      <div className="statement">
        <p> You will get One Sunflower per 15 minutes </p>
      </div>

    </div>
  );
};

export default HomePage;
