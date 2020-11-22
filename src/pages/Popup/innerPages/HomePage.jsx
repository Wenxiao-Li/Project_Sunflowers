import React from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import DisplaySession from '../modules/DisplaySession.jsx';

const HomePage = () => {
    return (
        <div className="Home">
            <h1>Project Sunflower!</h1>
            <img src={SunflowerBg} />
            <DisplaySession/>
        </div>
      );
}

export default HomePage;