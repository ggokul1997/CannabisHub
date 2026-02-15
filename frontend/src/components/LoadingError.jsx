import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';

const ErrorMessage = ({ message }) => {
  return (
    <Alert variant="danger" dismissible>
      {message}
    </Alert>
  );
};

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="d-flex justify-content-center align-items-center gap-2" style={{ minHeight: '300px' }}>
      <Spinner animation="border" role="status" variant="success" />
      <span>{message}</span>
    </div>
  );
};

export { ErrorMessage, LoadingSpinner };
