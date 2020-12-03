import React from 'react';
import { deleteBlacklist, deleteWhitelist } from './setting';
import { Button, ListGroup } from 'react-bootstrap';
import deleteIcon from '../../../assets/img/deleteIcon.png';

const Website = ({ url, isBlockList }) => {
  let operation = isBlockList
    ? () => deleteBlacklist(url)
    : () => deleteWhitelist(url);
  return (
    <ListGroup.Item className="website">
      {' '}
      {url}{' '}
      <img src={deleteIcon} onClick={operation} className="icon-pin-right" />{' '}
    </ListGroup.Item>
  );
};

export const ViewCurrentLists = ({
  isBlockList,
  onViewWebsite,
  blockList,
  allowList,
}) => {
  let list = [];
  let headerText = '';

  if (isBlockList) {
    list = blockList;
    headerText = 'BlockList';
  } else {
    list = allowList;
    headerText = 'AllowList';
  }

  return (
    <div>
      <span> {headerText} </span>
      <Button variant="light" onClick={onViewWebsite}>
        {' '}
        refresh{' '}
      </Button>

      <ListGroup>
        {list.map((site) => (
          <Website key={site} url={site} isBlockList={isBlockList} />
        ))}
      </ListGroup>
    </div>
  );
};
