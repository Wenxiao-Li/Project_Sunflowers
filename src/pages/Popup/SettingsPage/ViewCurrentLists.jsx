import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const Website = ({ url }) => {
  return <ListGroup.Item className="website"> {url}</ListGroup.Item>;
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

      <ListGroup>
        {list.map((site) => (
          <Website key={site} url={site} />
        ))}
      </ListGroup>
    </div>
  );
};
