import React, { useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ErrorMessage, LoadingSpinner } from '../components/LoadingError';
import {
  fetchWishlistStart,
  fetchWishlistSuccess,
  fetchWishlistFailure,
  removeFromWishlistSuccess,
} from '../slices/wishlistSlice';
import { wishlistAPI } from '../utils/api';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { wishlists, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchWishlist = async () => {
      dispatch(fetchWishlistStart());
      try {
        const response = await wishlistAPI.getWishlist();
        dispatch(fetchWishlistSuccess(response.data.wishlist));
      } catch (err) {
        dispatch(fetchWishlistFailure(err.response?.data?.message || 'Failed to fetch wishlist'));
      }
    };

    fetchWishlist();
  }, [token, navigate, dispatch]);

  const handleRemoveWishlist = async (productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      dispatch(removeFromWishlistSuccess(productId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container className="py-5">
      <h1 className="mb-4">My Wishlist</h1>

      {error && <ErrorMessage message={error} />}

      {wishlists.length === 0 && (
        <Alert variant="info">
          Your wishlist is empty. Start adding your favorite products!
        </Alert>
      )}

      {wishlists.length > 0 && (
        <>
          <p className="text-muted mb-4">
            You have {wishlists.length} item{wishlists.length !== 1 ? 's' : ''} in your wishlist
          </p>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {wishlists.map((item) => (
              <Col key={item._id}>
                <ProductCard
                  product={item.productId}
                  isInWishlist={true}
                  onRemoveWishlist={handleRemoveWishlist}
                  showWishlistBtn={true}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default WishlistPage;
