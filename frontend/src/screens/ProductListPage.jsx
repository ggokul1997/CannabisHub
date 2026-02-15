import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import FilterSection from '../components/FilterSection';
import { ErrorMessage, LoadingSpinner } from '../components/LoadingError';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setFilters,
  clearFilters,
} from '../slices/productSlice';
import {
  fetchWishlistStart,
  fetchWishlistSuccess,
  fetchWishlistFailure,
  addToWishlistSuccess,
  removeFromWishlistSuccess,
} from '../slices/wishlistSlice';
import { productAPI, wishlistAPI } from '../utils/api';

const HERO_BG = 'https://chronic-plum-6ozopdtaef.edgeone.app/pexels-kindelmedia-7667829.jpg';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error, filters } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.auth);
  const { wishlists } = useSelector((state) => state.wishlist);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const filterParams = {};
        if (filters.category) filterParams.category = filters.category;
        if (filters.minTHC) filterParams.minTHC = filters.minTHC;
        if (filters.maxTHC) filterParams.maxTHC = filters.maxTHC;
        if (filters.search) filterParams.search = filters.search;

        const response = await productAPI.getAllProducts(filterParams);
        dispatch(fetchProductsSuccess(response.data.products));
      } catch (err) {
        dispatch(fetchProductsFailure(err.response?.data?.message || 'Failed to fetch products'));
      }
    };

    fetchProducts();
  }, [filters, dispatch]);

  // Fetch wishlist
  useEffect(() => {
    if (token) {
      const fetchWishlist = async () => {
        dispatch(fetchWishlistStart());
        try {
          const response = await wishlistAPI.getWishlist();
          dispatch(fetchWishlistSuccess(response.data.wishlist));
          setWishlistIds(response.data.wishlist.map((item) => item.productId._id));
        } catch (err) {
          dispatch(fetchWishlistFailure(err.response?.data?.message || 'Failed to fetch wishlist'));
        }
      };

      fetchWishlist();
    }
  }, [token, dispatch]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleAddWishlist = async (productId) => {
    try {
      await wishlistAPI.addToWishlist(productId);
      const product = products.find((p) => p._id === productId);
      dispatch(addToWishlistSuccess({
        productId: product,
        _id: `${Date.now()}`,
      }));
      setWishlistIds([...wishlistIds, productId]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveWishlist = async (productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      dispatch(removeFromWishlistSuccess(productId));
      setWishlistIds(wishlistIds.filter((id) => id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Parallax Hero Section */}
      <div
        style={{
          position: 'relative',
          height: '400px',
          overflow: 'hidden',
          marginBottom: '50px',
        }}
      >
        {/* Background image with parallax effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`,
            zIndex: 1,
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2,
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            zIndex: 3,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '10px' , color:"white"}}>
            Cannabis Product Discovery
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#ddd' }}>
            Browse our collection of premium cannabis products
          </p>
        </div>
      </div>

      {/* Main content */}
      <Container fluid className="py-4">

      <FilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h5 className="mb-4">
            Found {products.length} product{products.length !== 1 ? 's' : ''}
          </h5>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {products.map((product) => (
              <Col key={product._id}>
                <ProductCard
                  product={product}
                  isInWishlist={wishlistIds.includes(product._id)}
                  onAddWishlist={handleAddWishlist}
                  onRemoveWishlist={handleRemoveWishlist}
                  showWishlistBtn={token !== null}
                />
              </Col>
            ))}
          </Row>
          {products.length === 0 && (
            <div className="text-center py-5">
              <p style={{ fontSize: '1.1rem', color: '#666' }}>
                No products found. Try adjusting your filters.
              </p>
            </div>
          )}
        </>
      )}
      </Container>
    </>
  );
};

export default ProductListPage;
