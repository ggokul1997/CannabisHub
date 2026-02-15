import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  register: (userData) => apiClient.post('/auth/register', userData),
  login: (credentials) => apiClient.post('/auth/login', credentials),
  getProfile: () => apiClient.get('/auth/profile'),
};

// Product API calls
export const productAPI = {
  getAllProducts: (filters) => apiClient.get('/products', { params: filters }),
  getProductById: (id) => apiClient.get(`/products/${id}`),
  createProduct: (productData) => apiClient.post('/products', productData),
  updateProduct: (id, productData) => apiClient.put(`/products/${id}`, productData),
  deleteProduct: (id) => apiClient.delete(`/products/${id}`),
};

// Wishlist API calls
export const wishlistAPI = {
  addToWishlist: (productId) => apiClient.post('/wishlist', { productId }),
  getWishlist: () => apiClient.get('/wishlist'),
  removeFromWishlist: (productId) =>
    apiClient.delete(`/wishlist/${productId}`),
  checkWishlistStatus: (productId) =>
    apiClient.get(`/wishlist/status/${productId}`),
};
