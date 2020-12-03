import React from 'react';

import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';

import { addBlacklistHandle, addWhitelistHandle } from './setting';

const onSubmitBlocklist = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formDataObj = Object.fromEntries(formData.entries());
  const website = formDataObj.addBlockList;
  console.log(website);
  addBlacklistHandle(website);
};

const onSubmitAllowlist = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formDataObj = Object.fromEntries(formData.entries());
  const website = formDataObj.addAllowList;
  console.log(website);
  addWhitelistHandle(website);
};

const BlockListForm = () => {
  return (
    <Form onSubmit={onSubmitBlocklist}>
      <InputGroup>
        <FormControl
          placeholder="Block websites during session"
          type="url"
          name="addBlockList"
        />
        <InputGroup.Append>
          <Button variant="light" type="submit">
            {' '}
            Add{' '}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

const AllowListForm = () => {
  return (
    <Form onSubmit={onSubmitAllowlist}>
      <InputGroup>
        <FormControl
          placeholder="Unblock websites during session"
          type="url"
          name="addAllowList"
        />
        <InputGroup.Append>
          <Button variant="light" type="submit">
            {' '}
            Add{' '}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export const ListForm = ({ isBlockList }) => {
  if (isBlockList) {
    return <BlockListForm />;
  } else {
    return <AllowListForm />;
  }
};
