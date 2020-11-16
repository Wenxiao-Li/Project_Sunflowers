import React from 'react';
import { createMemoryHistory } from 'history';
import Countdown from './modules/Countdown';
import SunflowerBg from '../../assets/img/IMG_1277.jpg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './Popup.css';

const history = createMemoryHistory();

const redirectSignIn = () => {
  history.push('/Options');
}



const Popup = () => {
  return (
    <div className="App">
        <h1>Project Sunflower!</h1>
        <img src={SunflowerBg} />
        <Countdown/>
        <a href="options.html" target="_blank">
            <button>Log In</button>
        </a>
    </div>
  );
};

export default Popup;
