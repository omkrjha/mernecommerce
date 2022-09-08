import React, { useState } from 'react';
import { Form, Button, FormControl, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Meta from './Meta';
const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <>
    <Meta title={keyword}/>
      <Form onSubmit={submitHandler} className='searchForm' inline='true'>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          className='mr-sm-2 ml-sm-5 search'
        ></Form.Control>
        <Button
          type='submit'
          variant='outline-success'
          className='p-2 searchBtn'
        >
          Search
        </Button>
      </Form>
    </>
  );
};

export default SearchBox;
