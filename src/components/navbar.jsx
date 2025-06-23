import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-around bg-orange-300 p-4 text-white font-bold">
      <Link to="/">Menu</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/order">Order</Link>
      <Link to="/receipt">Receipt</Link>
    </nav>
  );
}
