import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CartPage from './pages/cartPage';
import OrderPage from './pages/orderPage';
import ReceiptPage from './pages/receiptPage';
import { fetchApiKey } from './features/tenant/tenantSlice';

function App() {
  const dispatch = useDispatch();

  // Initialize API key when app starts
  useEffect(() => {
    dispatch(fetchApiKey());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="receipt/:id" element={<ReceiptPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;