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

const SuggestWebsite = ({ url }) => {
  return <li> {url} </li>;
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
      <span> Suggestions </span>
      <ul>
        {suggestionList.map((site) => (
          <SuggestWebsite key={site} url={site} />
        ))}
      </ul>
    </div>
  );
};
