import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Alert } from 'react-bootstrap';
import { FaHeart, FaArrowLeft, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, LoadingSpinner } from '../components/LoadingError';
import {
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
} from '../slices/productSlice';
import {
  addToWishlistSuccess,
  removeFromWishlistSuccess,
} from '../slices/wishlistSlice';
import { productAPI, wishlistAPI } from '../utils/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const { token, user } = useSelector((state) => state.auth);
  const { wishlists } = useSelector((state) => state.wishlist);
  const [isInWishlist, setIsInWishlist] = React.useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(fetchProductStart());
      try {
        const response = await productAPI.getProductById(id);
        dispatch(fetchProductSuccess(response.data.product));

        if (token) {
          const wishlistStatus = await wishlistAPI.checkWishlistStatus(id);
          setIsInWishlist(wishlistStatus.data.isInWishlist);
        } else {
          setIsInWishlist(false);
        }
      } catch (err) {
        dispatch(fetchProductFailure(err.response?.data?.message || 'Failed to fetch product'));
      }
    };

    fetchProduct();
  }, [id, token, dispatch]);

  const handleAddWishlist = async () => {
    try {
      if (!token) return navigate('/login');
      await wishlistAPI.addToWishlist(id);
      dispatch(addToWishlistSuccess({
        productId: product,
        _id: `${Date.now()}`,
      }));
      setIsInWishlist(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveWishlist = async () => {
    try {
      if (!token) return navigate('/login');
      await wishlistAPI.removeFromWishlist(id);
      dispatch(removeFromWishlistSuccess(id));
      setIsInWishlist(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Allow viewing product details while logged out; wishlist actions redirect to login.

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <Container className="py-5">
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => navigate(-1)}
        className="mb-4 d-flex align-items-center gap-2"
      >
        <FaArrowLeft /> Back
      </Button>

      <Row>
        <Col md={6}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              borderRadius: '8px',
              maxHeight: '500px',
              objectFit: 'cover',
            }}
          />
        </Col>

        <Col md={6}>
          <h2>{product.name}</h2>

          <div className="mb-3">
            <Badge bg="success" className="me-2" style={{ fontSize: '0.9rem' }}>
              {product.category}
            </Badge>
            <Badge bg="info" style={{ fontSize: '0.9rem' }}>
              {product.usageType}
            </Badge>
          </div>

          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1.5rem' }}>
            {product.description}
          </p>

          <div className="row mb-4">
            <div className="col-6">
              <h6 style={{ color: '#2d5016' }}>THC Content</h6>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{product.thc}%</p>
            </div>
            <div className="col-6">
              <h6 style={{ color: '#2d5016' }}>CBD Content</h6>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{product.cbd}%</p>
            </div>
          </div>

          {product.effects && product.effects.length > 0 && (
            <div className="mb-4">
              <h6 style={{ color: '#2d5016' }}>Effects</h6>
              <div>
                {product.effects.map((effect, idx) => (
                  <Badge key={idx} bg="light" text="dark" className="me-2 mb-2">
                    {effect}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <h6 style={{ color: '#2d5016' }}>Price</h6>
            <h3 style={{ color: '#2d5016' }}>${product.price.toFixed(2)}</h3>
          </div>

          <div className="mb-4">
            <h6 style={{ color: '#2d5016' }}>Stock Available</h6>
            <p>{product.stock} units in stock</p>
          </div>

          <div className="d-flex gap-2">
            <Button
              variant="primary"
              size="lg"
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline-danger"
              size="lg"
              onClick={() =>
                isInWishlist ? handleRemoveWishlist() : handleAddWishlist()
              }
            >
              {isInWishlist ? (
                <>
                  <FaHeart className="me-2" style={{ color: 'red' }} />
                  Remove from Wishlist
                </>
              ) : (
                <>
                  <FaRegHeart className="me-2" />
                  Add to Wishlist
                </>
              )}
            </Button>
          </div>

          {product.stock === 0 && (
            <Alert variant="warning" className="mt-3">
              This product is currently out of stock
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
