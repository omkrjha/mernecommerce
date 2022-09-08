import React, { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ListGroup,
  Image,
  Form,
  Row,
  Col,
  Card,
  Button,
  ListGroupItem,
  FormControl,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Meta from '../components/Meta';
const CartScreen = () => {
  const params = useParams();
  const productId = params.id;
  const location = useLocation();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  // console.log(qty);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  // console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const navigate = useNavigate();
  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <>
      <Meta title={`Your Cart`} />

      <Row>
        <Col md={8}>
          <h1>Shopping cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to='/'>Go Back</Link>{' '}
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                      {/* these fields came from cartActions.js */}
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <FormControl
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option
                            aria-label='Default select example'
                            key={x + 1}
                            value={x + 1}
                          >
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Proceed to checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Link className='btn btn-dark my-3' to='/'>
            Go Back
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
