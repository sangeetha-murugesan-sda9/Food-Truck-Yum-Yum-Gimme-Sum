import { Routes, Route } from 'react-router-dom';
import MenuPage from './features/menu/MenuPage';
import CartPage from './features/cart/CartPage';
import OrderPage from './features/order/OrderPage';
import ReceiptPage from './features/receipt/ReceiptPage';
import Layout from './components/Layout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/receipt" element={<ReceiptPage />} />
      </Routes>
      
    </Layout>
  );
}
