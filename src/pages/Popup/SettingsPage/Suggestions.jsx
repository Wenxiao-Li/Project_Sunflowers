import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const SuggestWebsite = ({ url }) => {
  return <ListGroup.Item className="website"> {url} </ListGroup.Item>;
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
          <SuggestWebsite key={site} url={site} />
        ))}
      </ListGroup>
    </div>
  );
};
