import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div>
      <nav>
        <Link to="/">Menu</Link> | <Link to="/cart">Cart</Link> | <Link to="/order">Order</Link> | <Link to="/receipt">Receipt</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
