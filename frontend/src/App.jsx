import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import { initAuth } from './slices/authSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductListPage from './screens/ProductListPage';
import ProductDetailPage from './screens/ProductDetailPage';
import WishlistPage from './screens/WishlistPage';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import AdminPage from './screens/AdminPage';

const Layout = () => ( 
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />
    <main style={{ flex: 1 }}>
      <Outlet />
    </main> 
    <Footer />
  </div>  
);
// Check token  fronm localStorage
 
const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, []); 

  return <RouterProvider router={router} />;
};

const router = createBrowserRouter(
  [
    {
      path: '/', 
      element: <Layout />,
      children: [
        { index: true, element: <ProductListPage /> },
        { path: 'product/:id', element: <ProductDetailPage /> },
        { path: 'wishlist', element: <WishlistPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'admin', element: <AdminPage /> },
      ],
    },
  ],
);
 
function App() {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
}

export default App;
