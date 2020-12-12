import React from 'react';

import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import './SettingsPage.css';

import { ViewCurrentLists } from './ViewCurrentLists';
import { ListForm } from './ListForm';
import { Suggestions } from './Suggestions';

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

  const setMode = (val) => {
    setBlockListBoolean(val);
  };

  const currentMode = isBlockList ? 'BlockList' : 'AllowList';
  return (
    <div className="page" id="settings">
      <div id="toggle-list-group">
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
      </div>
      <div id="toggle-list-description">
        <span>
          Add {currentMode} websites for {currentMode} mode
        </span>
      </div>
      <div className="scroll-view">
        <ListForm isBlockList={isBlockList} />
        <ViewCurrentLists isBlockList={isBlockList} />
        <Suggestions isBlockList={isBlockList} />
      </div>
    </div>
  );
}
