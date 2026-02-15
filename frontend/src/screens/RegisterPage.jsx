import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from '../slices/authSlice';
import { authAPI } from '../utils/api';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    dispatch(registerStart());

    try {
      const response = await authAPI.register({
        username,
        email,
        password,
      });
      dispatch(registerSuccess(response.data));
      navigate('/');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMsg);
      dispatch(registerFailure(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Card className="shadow-sm">
          <Card.Body className="p-5">
            <h2 className="text-center mb-4">Register</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small className="text-muted">At least 6 characters</small>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Form>

            <p className="text-center text-muted">
              Already have an account?{' '}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Login here
              </Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default RegisterPage;
