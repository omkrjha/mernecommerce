import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';
const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <>
      <Meta title={`Shipping Address`} />

      <FormContainer>
        <CheckoutSteps step1 step2 />

        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup controlId='address'>
            <FormLabel>Address</FormLabel>
            <FormControl
              type='text'
              placeholder='Enter Address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></FormControl>
          </FormGroup>
          &nbsp;
          <FormGroup controlId='city'>
            <FormLabel>City</FormLabel>
            <FormControl
              type='text'
              placeholder='Enter city'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></FormControl>
          </FormGroup>
          &nbsp;
          <FormGroup controlId='postalCode'>
            <FormLabel>Postal Code</FormLabel>
            <FormControl
              type='text'
              placeholder='Enter Postal Code'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></FormControl>
          </FormGroup>
          &nbsp;
          <FormGroup controlId='Country'>
            <FormLabel>Country</FormLabel>
            <FormControl
              placeholder='Enter Country'
              type='text'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></FormControl>
            &nbsp;
          </FormGroup>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
