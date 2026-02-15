import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert, Table, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, LoadingSpinner } from '../components/LoadingError';
import { productAPI } from '../utils/api';

const AdminPage = () => {
  const { user, token, loading: authLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Flower',
    thc: '',
    cbd: '',
    price: '',
    image: '',
    effects: '',
    usageType: 'Smoking',
    stock: '',
  });

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [editingId, setEditingId] = useState(null);

  if (authLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!token || user?.role !== 'admin') {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          You do not have access to this page. Only admins can access the admin panel.
        </Alert>
      </Container>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const productData = {
        ...formData,
        thc: parseFloat(formData.thc),
        cbd: parseFloat(formData.cbd),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        effects: formData.effects
          .split(',')
          .map((effect) => effect.trim())
          .filter((effect) => effect),
      };

      if (editingId) {
        await productAPI.updateProduct(editingId, productData);
        setSuccess('Product updated successfully!');
      } else {
        await productAPI.createProduct(productData);
        setSuccess('Product created successfully!');
      }
      setFormData({
        name: '',
        description: '',
        category: 'Flower',
        thc: '',
        cbd: '',
        price: '',
        image: '',
        effects: '',
        usageType: 'Smoking',
        stock: '',
      });

      // refresh list and clear edit mode
      await loadProducts();
      setEditingId(null);

      setTimeout(() => {
        setShowForm(false);
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await productAPI.getAllProducts();
      setProducts(res.data.products || []);
    } catch (err) {
      console.error('Failed loading products', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingId(product._id);
    setShowForm(true);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      category: product.category || 'Flower',
      thc: product.thc ?? '',
      cbd: product.cbd ?? '',
      price: product.price ?? '',
      image: product.image || '',
      effects: (product.effects || []).join(', '),
      usageType: product.usageType || 'Smoking',
      stock: product.stock ?? '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productAPI.deleteProduct(id);
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error('Failed to delete', err);
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Admin Panel</h1>

      <div className="mb-4">
        <p className="text-muted">
          Logged in as: <strong>{user?.username}</strong> (Admin)
        </p>
      </div>

      <Card className="shadow-sm mb-5">
        <Card.Body className="p-4">
          <h5 className="mb-3">Add New Product</h5>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Button
            variant="primary"
            size="lg"
            className="mb-4"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Add New Product'}
          </Button>

          {showForm && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  placeholder="Enter image URL (optional)"
                  value={formData.image}
                  onChange={handleInputChange}
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{
                      marginTop: '10px',
                      maxWidth: '200px',
                      maxHeight: '200px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Category *</Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="Flower">Flower</option>
                      <option value="Edibles">Edibles</option>
                      <option value="Oils">Oils</option>
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Usage Type *</Form.Label>
                    <Form.Select
                      name="usageType"
                      value={formData.usageType}
                      onChange={handleInputChange}
                    >
                      <option value="Smoking">Smoking</option>
                      <option value="Vaping">Vaping</option>
                      <option value="Edible">Edible</option>
                      <option value="Topical">Topical</option>
                      <option value="Sublingual">Sublingual</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label>THC (%) *</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      name="thc"
                      placeholder="e.g., 20.5"
                      value={formData.thc}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label>CBD (%) *</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      name="cbd"
                      placeholder="e.g., 1.5"
                      value={formData.cbd}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Price ($) *</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      min="0"
                      name="price"
                      placeholder="e.g., 12.99"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Effects (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="effects"
                  placeholder="e.g., Relaxed, Happy, Sleepy"
                  value={formData.effects}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Stock *</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  name="stock"
                  placeholder="e.g., 10"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                size="lg"
                className="w-100"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Product'}
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Product Management</h5>
            <div>
              <Button variant="outline-secondary" size="sm" onClick={loadProducts} className="me-2">
                Refresh
              </Button>
              <Button variant="primary" size="sm" onClick={() => { setShowForm(!showForm); setEditingId(null); }}>
                {showForm ? 'Cancel' : 'Add New Product'}
              </Button>
            </div>
          </div>

          {loadingProducts ? (
            <LoadingSpinner />
          ) : (
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td style={{ width: 120 }}>
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 6 }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>${p.price?.toFixed(2)}</td>
                    <td>{p.stock}</td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(p)}>
                        Edit
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminPage;
