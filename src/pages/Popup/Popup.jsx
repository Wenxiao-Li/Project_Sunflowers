import React from 'react';
import { createMemoryHistory } from 'history';
import Countdown from './modules/Countdown';
import Options from '../Options/Options';
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
        <img src="IMG_1277.JPG" />
        <Countdown/>
        <a href="options.html" target="_blank">
            <button>Log In</button>
        </a>
    </div>
  );
};

export default Popup;
