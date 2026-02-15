import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../slices/authSlice';
import { authAPI } from '../utils/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    dispatch(loginStart());

    try {
      const response = await authAPI.login({ email, password });
      dispatch(loginSuccess(response.data));
      navigate('/');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMsg);
      dispatch(loginFailure(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Card className="shadow-sm">
          <Card.Body className="p-5">
            <h2 className="text-center mb-4">Login</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>

            <p className="text-center text-muted">
              Don't have an account?{' '}
              <Link to="/register" style={{ textDecoration: 'none' }}>
                Register here
              </Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default LoginPage;
