import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';

render(<Popup />, window.document.querySelector('#app-container'));
