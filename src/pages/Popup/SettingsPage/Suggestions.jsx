import React from 'react';
import { addBlocklist, addAllowlist } from './setting';
import { ListGroup, Button } from 'react-bootstrap';
import addIcon from '../../../assets/img/addIcon.png';

const SuggestWebsite = ({ url, isBlockList }) => {
  let operation = isBlockList
    ? () => addBlocklist(url)
    : () => addAllowlist(url);
  return (
    <ListGroup.Item className="website">
      {url} <img src={addIcon} onClick={operation} className="icon-pin-right" />
    </ListGroup.Item>
  );
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

export const Suggestions = ({ isBlockList }) => {
  let suggestionList = [];
  if (isBlockList) {
    suggestionList = blockListSuggestions;
  } else {
    suggestionList = allowListSuggestions;
  }

  return (
    <div>
      <div className="title">
        <h5 className="title-text"> Suggested websites... </h5>
      </div>
      <ListGroup>
        {suggestionList.map((site) => (
          <SuggestWebsite key={site} url={site} isBlockList={isBlockList} />
        ))}
      </ListGroup>
    </div>
  );
};
