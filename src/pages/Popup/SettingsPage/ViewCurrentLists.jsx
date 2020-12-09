import React from 'react';
import { deleteBlocklist, deleteAllowlist } from './setting';
import { Button, ListGroup } from 'react-bootstrap';
import deleteIcon from '../../../assets/img/deleteIcon.png';

import { UserContext } from '../User';

const Website = ({ url, isBlockList }) => {
  const { user } = React.useContext(UserContext);

  let operation = isBlockList
    ? () => deleteBlocklist(user, url)
    : () => deleteAllowlist(user, url);
  return (
    <ListGroup.Item className="website">
      {' '}
      {url}{' '}
      <img src={deleteIcon} onClick={operation} className="icon-pin-right" />{' '}
    </ListGroup.Item>
  );
};

export const ViewCurrentLists = ({ isBlockList }) => {
  const { snapshotData } = React.useContext(UserContext);

  let list = [];
  let headerText = '';

  if (isBlockList) {
    list = (snapshotData && snapshotData.blocklist) || [];
    headerText = 'BlockList';
  } else {
    list = (snapshotData && snapshotData.allowlist) || [];
    headerText = 'AllowList';
  }

  return (
    <div>
      <span> {headerText} </span>
      <ListGroup>
        {list.map((site) => (
          <Website key={site} url={site} isBlockList={isBlockList} />
        ))}
      </ListGroup>
    </div>
  );
};
