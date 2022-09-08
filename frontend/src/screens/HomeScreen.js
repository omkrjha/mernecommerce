import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const keyword = param.keyword;

  const pageNumber = param.pageNumber || 1;

  const allProducts = useSelector((state) => state.allProductList); //all these state are defiend in store.js
  // console.log('all products is :');
  // console.log(allProducts);
  const productList = useSelector((state) => state.productList);
  // console.log(productList);
  const { loading, error, products, page, pages } = productList;
  // productList --> store.js --> prodycReducer.js

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-dark'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        // create artificial error in productRoutes.js
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products?.length &&
              products.map((product) => {
                return (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                );
              })}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
