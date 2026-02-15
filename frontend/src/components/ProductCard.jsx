import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const THEME = {
  primary: '#2d5016', // Deep Forest Green
  accent: '#708d5d',  // Sage Green
  mutedText: '#6c757d',
  cardBg: '#ffffff',
  border: '#e9ecef',
  price: '#1a330a'
};

const ProductCard = ({ product, isInWishlist, onAddWishlist, onRemoveWishlist, showWishlistBtn = true }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      onRemoveWishlist(product._id);
    } else {
      onAddWishlist(product._id);
    }
  };

  return (
    <Card 
      className="h-100 border-0 shadow-sm transition-all" 
      style={{ 
        borderRadius: '16px', 
        background: THEME.cardBg,
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out',
        cursor: 'pointer'
      }}
      onClick={handleCardClick}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Image Container with Badge Overlay */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{ height: '100%', objectFit: 'cover', width: '100%' }}
        />
        
        {/* Wishlist Button Overlay */}
        {showWishlistBtn && (
          <div 
            style={{ 
              position: 'absolute', 
              top: '12px', 
              right: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              padding: '2px',
              cursor: 'pointer'
            }}
          >
            <button
              className="p-2 d-flex align-items-center justify-content-center"
              style={{ 
                textDecoration: 'none', 
                fontSize: '1.1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
              onClick={handleWishlistClick}
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isInWishlist ? (
                <FaHeart style={{ color: '#d9534f' }} />
              ) : (
                <FaRegHeart style={{ color: THEME.primary }} />
              )}
            </button>
          </div>
        )}

        {/* Floating Category Badge */}
        <Badge 
          className="position-absolute" 
          style={{ 
            left: '12px', 
            bottom: '12px', 
            background: 'rgba(45, 80, 22, 0.85)', 
            backdropFilter: 'blur(4px)',
            fontWeight: '500'
          }}
        >
          {product.category}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column p-4">
        <div className="mb-1">
          <small className="text-uppercase tracking-wider" style={{ color: THEME.accent, fontWeight: 700, fontSize: '0.7rem' }}>
            {product.usageType}
          </small>
        </div>

        <Card.Title 
          className="text-truncate mb-2" 
          title={product.name} 
          style={{ fontWeight: 700, fontSize: '1.2rem', color: '#1a1a1a' }}
        >
          {product.name}
        </Card.Title>

        <Card.Text 
          className="mb-3" 
          style={{ fontSize: '0.875rem', color: THEME.mutedText, height: '40px', overflow: 'hidden' }}
        >
          {product.description && product.description.length > 80 
            ? `${product.description.substring(0, 80)}...` 
            : product.description}
        </Card.Text>

        {/* Stats Row */}
        <div 
          className="d-flex gap-3 mb-4 p-2" 
          style={{ background: '#f8f9fa', borderRadius: '8px', border: `1px solid ${THEME.border}` }}
        >
          <div className="flex-fill text-center">
            <small className="d-block text-muted" style={{ fontSize: '0.65rem' }}>THC</small>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{product.thc}%</span>
          </div>
          <div style={{ width: '1px', background: THEME.border }}></div>
          <div className="flex-fill text-center">
            <small className="d-block text-muted" style={{ fontSize: '0.65rem' }}>CBD</small>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{product.cbd}%</span>
          </div>
        </div>

        <div className="mt-auto">
          <span style={{ fontSize: '0.8rem', color: THEME.mutedText, display: 'block' }}>Price</span>
          <h4 style={{ color: THEME.price, margin: 0, fontWeight: 800 }}>
            ${product.price.toFixed(2)}
          </h4>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;