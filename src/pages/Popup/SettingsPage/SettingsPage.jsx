import React from 'react';

import {
  Container,
  Row,
  Col,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Form,
  InputGroup,
  FormControl,
} from 'react-bootstrap';

import './SettingsPage.css';

import SunflowerBg from '../../../assets/img/header.png';
import firebase from '../../Background/modules/firebaseconfig';
import {
  addBlacklistHandle,
  addWhitelistHandle,
  viewWebsitelistHandle,
} from './setting';
import { ViewCurrentLists } from './ViewCurrentLists';
import { ListForm } from './ListForm';

/**
 * Render Settings Page inside Popup
 */
export default function SettingsPage() {
  // Set States goes here

  /**
   * Description: Initializing States, do not pass function into useState
   * isBlockList: state
   * setBlockListBoolean: setState for isBlockList, this is async so be careful
   * param: initial value
   */
  const [isBlockList, setBlockListBoolean] = React.useState(true);
  const [blockList, setBlockList] = React.useState([]);
  const [allowList, setAllowList] = React.useState([]);

  const setMode = (val) => {
    setBlockListBoolean(val);
  };

  const onViewWebsite = () => {
    viewWebsitelistHandle(displayLists);
  };

  const displayLists = (blockList, allowList) => {
    setBlockList(blockList);
    setAllowList(allowList);
  };

  const blockListSuggestions = [
    'https://www.facebook.com',
    'https://www.youtube.com',
    'https://www.twitch.tv',
  ];
  const allowListSuggestions = [
    'https://www.google.com',
    'https://www.wikipedia.org',
    'https://canvas.ucsd.edu',
  ];
  const blockSuggestionsView = blockListSuggestions.map((site) => {
    return <li key={'block Suggestions: ' + site}> {site} </li>;
  });

  const allowSuggestionsView = allowListSuggestions.map((site) => {
    return <li key={'allow Suggestions: ' + site}> {site} </li>;
  });

  const currentMode = isBlockList ? 'BlockList' : 'AllowList';

  return (
    <div className="settings">
      <img src={SunflowerBg} />
      <Container fluid="md">
        <Row>
          <Col>
            <ToggleButtonGroup
              type="radio"
              name="value"
              value={isBlockList}
              onChange={setMode}
            >
              <ToggleButton variant="toggle" value={true}>
                {' '}
                BlockList{' '}
              </ToggleButton>
              <ToggleButton variant="toggle" value={false}>
                {' '}
                AllowList{' '}
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <span>
              Add {currentMode} websites for {currentMode} mode
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListForm isBlockList={isBlockList} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="scroll-view">
              <ViewCurrentLists
                isBlockList={isBlockList}
                onViewWebsite={onViewWebsite}
                blockList={blockList}
                allowList={allowList}
              />
              <span> Suggestions </span>
              {isBlockList ? (
                <ul className="white">{blockSuggestionsView}</ul>
              ) : (
                <ul className="white">{allowSuggestionsView}</ul>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
