import { Link } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  return (
    <nav>
      <div className="logo">Burger House</div>
      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="hamburger"></label>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation
