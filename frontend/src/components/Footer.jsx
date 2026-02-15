import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLeaf, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-5 py-5">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h6 className="mb-3 d-flex align-items-center gap-2">
              <FaLeaf color="#6ba829" /> Cannabis Hub
            </h6>
            <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
              Your trusted platform for discovering premium cannabis products.
            </p>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <h6 className="mb-3">Quick Links</h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <a href="/" style={{ color: '#ccc', textDecoration: 'none' }}>
                  Products
                </a>
              </li>
              <li>
                <a href="/wishlist" style={{ color: '#ccc', textDecoration: 'none' }}>
                  Wishlist
                </a>
              </li>
              <li>
                <a href="/login" style={{ color: '#ccc', textDecoration: 'none' }}>
                  Login
                </a>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" style={{ color: '#6ba829', fontSize: '1.3rem' }}>
                <FaFacebook />
              </a>
              <a href="#" style={{ color: '#6ba829', fontSize: '1.3rem' }}>
                <FaTwitter />
              </a>
              <a href="#" style={{ color: '#6ba829', fontSize: '1.3rem' }}>
                <FaInstagram />
              </a>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <Row>
          <Col md={6}>
            <p style={{ color: '#ccc', fontSize: '0.9rem', margin: 0 }}>
              &copy; {currentYear} Cannabis Hub. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p style={{ color: '#ccc', fontSize: '0.9rem', margin: 0 }}>
              <a href="#" style={{ color: '#6ba829', textDecoration: 'none' }}>
                Privacy Policy
              </a>{' '}
              |{' '}
              <a href="#" style={{ color: '#6ba829', textDecoration: 'none' }}>
                Terms of Service
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
