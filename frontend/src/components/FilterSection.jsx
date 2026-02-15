import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';

const FilterSection = ({ filters, onFilterChange, onClearFilters }) => {
  const handleCategoryChange = (e) => {
    onFilterChange({
      ...filters,
      category: e.target.value || null,
    });
  };

  const handleThcChange = (type, value) => {
    onFilterChange({
      ...filters,
      [type]: value ? parseFloat(value) : 0,
    });
  };

  const handleSearchChange = (e) => {
    onFilterChange({
      ...filters,
      search: e.target.value,
    });
  };

  return (
    <Form className="p-4 bg-white rounded shadow-sm mb-4">
      <h5 className="mb-3">
        <FaSearch className="me-2" />
        Filter Products
      </h5>
      <Row>
        <Col md={6} lg={3} className="mb-3">
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={filters.category || ''}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              <option value="Flower">Flower</option>
              <option value="Edibles">Edibles</option>
              <option value="Oils">Oils</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6} lg={3} className="mb-3">
          <Form.Group>
            <Form.Label>Min THC (%)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="100"
              value={filters.minTHC}
              onChange={(e) => handleThcChange('minTHC', e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={6} lg={3} className="mb-3">
          <Form.Group>
            <Form.Label>Max THC (%)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="100"
              value={filters.maxTHC}
              onChange={(e) => handleThcChange('maxTHC', e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={6} lg={3} className="mb-3">
          <Form.Group>
            <Form.Label>Search by Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Button
        variant="outline-primary"
        size="sm"
        onClick={onClearFilters}
        className="d-flex align-items-center gap-2"
      >
        <FaTimes /> Clear Filters
      </Button>
    </Form>
  );
};

export default FilterSection;
