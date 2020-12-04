import React from 'react';
import HomePage from './HomePage/HomePage.jsx';
import ProfilePage from './ProfilePage/ProfilePage.jsx';
import SettingsPage from './SettingsPage/SettingsPage.jsx';
import SocialPage from './SocialPage/SocialPage.jsx';
import { AuthProvider } from '../../auth/Auth';
import { Container, Row, Col } from 'react-bootstrap';
import './Popup.css';
import SunflowerBg from '../../assets/img/header.png';
import HomeIcon from '../../assets/img/homeTab.png';
import SocialIcon from '../../assets/img/socialTab.png';
import SettingsIcon from '../../assets/img/settingTab.png';
import ProfileIcon from '../../assets/img/profileTab.png';

const Popup = () => {
  const [pageName, setPage] = React.useState('HomePage');

  const components = {
    HomePage: <HomePage />,
    SettingsPage: <SettingsPage />,
    SocialPage: <SocialPage />,
    ProfilePage: <ProfilePage />,
  };

  const showComponent = (componentName) => {
    setPage(componentName);
  };

  return (
    <AuthProvider>
      <img id="logo" src={SunflowerBg}></img>
      <div>{components[pageName]}</div>
      <Container>
        <Row id="bottom-icon-navbar">
          <Col>
            <img
              className={pageName === 'HomePage' ? 'icons active' : 'icons'}
              src={HomeIcon}
              onClick={() => showComponent('HomePage')}
            />
          </Col>
          <Col>
            <img
              className={pageName === 'SettingsPage' ? 'icons active' : 'icons'}
              src={SettingsIcon}
              onClick={() => showComponent('SettingsPage')}
            />
          </Col>
          <Col>
            <img
              className={pageName === 'SocialPage' ? 'icons active' : 'icons'}
              src={SocialIcon}
              onClick={() => showComponent('SocialPage')}
            />
          </Col>
          <Col>
            <img
              className={pageName === 'ProfilePage' ? 'icons active' : 'icons'}
              src={ProfileIcon}
              onClick={() => showComponent('ProfilePage')}
            />
          </Col>
        </Row>
      </Container>
    </AuthProvider>
  );
};

export default Popup;
