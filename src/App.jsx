import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import Reviews from './pages/Reviews'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Payment from './pages/Payment'
import './App.css'

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
