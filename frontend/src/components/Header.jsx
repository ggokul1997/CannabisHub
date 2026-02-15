
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { FaLeaf, FaHeart, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { wishlists } = useSelector((state) => state.wishlist);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Aesthetic Theme Colors
  const THEME = {
    navBg: '#5fde0b', // Deep Forest Green
    text: '#ffffff',
    textMuted: 'rgba(255, 255, 255, 0.75)',
    accent: '#9bbb7a',
    buttonHover: '#3d6322'
  };

  return (
    <Navbar 
      expand="lg" 
      className="shadow-sm py-3" 
      style={{ 
        backgroundColor: isScrolled ? THEME.navBg : 'rgba(45, 80, 22, 0.3)',
        backdropFilter: isScrolled ? 'none' : 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.3s ease',
        position: 'relative',
        zIndex: 100
      }}
    >
      <Container>
        {/* Brand Section */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 group">
          <div 
            className="d-flex align-items-center justify-content-center"
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              width: '40px', 
              height: '40px', 
              borderRadius: '12px',
              backdropFilter: 'blur(4px)'
            }}
          >
            <FaLeaf size={20} color={THEME.accent} />
          </div>
          <span style={{ 
            fontWeight: '700', 
            color: THEME.text, 
            letterSpacing: '0.5px',
            fontSize: '1.25rem'
          }}>
            Cannabis Hub
          </span>
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          style={{ borderColor: 'rgba(255,255,255,0.2)', filter: 'invert(1)' }}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3 mt-3 mt-lg-0">
            
            {/* Navigation Links */}
            <Nav.Link 
              as={Link} 
              to="/" 
              style={{ color: THEME.textMuted, fontWeight: '500', fontSize: '0.95rem' }}
              className="px-3"
            >
              Products
            </Nav.Link>
            
            {user?.role === 'admin' && (
              <Nav.Link 
                as={Link} 
                to="/admin"
                style={{ color: THEME.accent, fontWeight: '500', fontSize: '0.95rem' }}
              >
                Admin Panel
              </Nav.Link>
            )}

            {/* User Logged In Section */}
            {token && (
              <>
                <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)' }} className="d-none d-lg-block mx-2"></div>
                
                <Nav.Link as={Link} to="/wishlist" className="position-relative d-flex align-items-center">
                  <div style={{ 
                    background: 'rgba(255,255,255,0.1)', 
                    padding: '8px', 
                    borderRadius: '50%',
                    display: 'flex',
                    transition: 'all 0.2s'
                  }}>
                    <FaHeart color={THEME.text} />
                  </div>
                  {wishlists.length > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                      style={{ 
                        fontSize: '0.65rem', 
                        background: '#e63946',
                        border: `2px solid ${THEME.navBg}` 
                      }}
                    >
                      {wishlists.length}
                    </span>
                  )}
                </Nav.Link>

                <span style={{ color: THEME.text, fontWeight: '600', fontSize: '0.9rem' }}>
                  {user?.username}
                </span>

                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="d-flex align-items-center gap-2 px-3 py-2"
                  style={{ borderRadius: '20px', fontSize: '0.85rem', borderWidth: '1px' }}
                >
                  <FaSignOutAlt /> Logout
                </Button>
              </>
            )}

            {/* Guest Section */}
            {!token && (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-light" // Keep variant but override via style if needed for specificity
                  size="sm"
                  className="d-flex align-items-center gap-2 px-4 py-2"
                  style={{ 
                    borderRadius: '20px', 
                    borderWidth: '1px',
                    fontSize: '0.9rem',
                    color: THEME.textMuted,
                    borderColor: 'rgba(255,255,255,0.3)'
                  }}
                >
                  <FaSignInAlt /> Login
                </Button>
                
                <Button
                  as={Link}
                  to="/register"
                  variant="light"
                  size="sm"
                  className="px-4 py-2"
                  style={{ 
                    borderRadius: '20px', 
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    background: THEME.accent,
                    borderColor: THEME.accent,
                    color: '#fff'
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;