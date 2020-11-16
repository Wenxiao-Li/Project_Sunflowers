import React from 'react';
import { render } from 'react-dom';

import './index.css';

render(
    <h1 id="welcome">Welcome to our home page!</h1>,
    window.document.querySelector('#app-container')
);