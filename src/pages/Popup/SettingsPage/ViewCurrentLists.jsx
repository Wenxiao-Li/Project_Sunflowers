import React from 'react';
import { Button } from 'react-bootstrap';

const Website = ({ url }) => {
  return <li> {url}</li>;
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
        fetch{' '}
      </Button>

      <ul className="white">
        {list.map((site) => (
          <Website key={site} url={site} />
        ))}
      </ul>
    </div>
  );
};
