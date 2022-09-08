import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin; //see userReducer it has loading,error,userInfo

  //For full URL, you have to use location.pathname + location.search
  //For just the path name :- location.pathname
  // const redirect = location.pathname + location.search;
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const navigate = useNavigate();     //useNavigate is use instead of history

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      <Meta title={`Login`} description={`Login with Your Credentials`} keywords={`Login Page`} />

      <FormContainer>
        <h1>Sign in</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <FormGroup controlId='email'>
            <FormLabel>Email Address</FormLabel>
            <FormControl
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId='password'>
            <FormLabel>Password</FormLabel>
            <FormControl
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
            &nbsp;
          </FormGroup>
          <Button type='submit' variant='primary'>
            Sign In
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
