import { useCart } from '../context/CartContext'
import { useNavigate, Link } from 'react-router-dom'
import './Cart.css'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, updateNotes, getTotalPrice } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <section className="cart-section">
        <h2>Shopping Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/menu" className="btn">Continue Shopping</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="cart-section">
      <h2>Shopping Cart</h2>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={`images/${item.image}`} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="price">{item.price}</p>
                <textarea 
                  placeholder="Special requests (e.g., no spicy, extra cheese...)"
                  value={item.notes || ''}
                  onChange={(e) => updateNotes(item.id, e.target.value)}
                  style={{ width: '100%', minHeight: '60px', marginTop: '10px', padding: '8px', fontFamily: 'inherit' }}
                />
              </div>
              <div className="item-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ fontSize: '20px', padding: '8px 12px', cursor: 'pointer', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>−</button>
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  min="1"
                  style={{ 
                    width: '50px', 
                    textAlign: 'center', 
                    fontSize: '18px', 
                    padding: '8px 5px',
                    border: '2px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ fontSize: '20px', padding: '8px 12px', cursor: 'pointer', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>+</button>
              </div>
              <div className="item-total">
                ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-line">
            <span>Subtotal:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Tax (2%):</span>
            <span>${(getTotalPrice() * 0.02).toFixed(2)}</span>
          </div>
          <div className="summary-line total">
            <span>Total:</span>
            <span>${(getTotalPrice() * 1.02).toFixed(2)}</span>
          </div>
          <Link to="/payment" className="btn-checkout">Proceed to Payment</Link>
        </div>
      </div>
    </section>
  )
}

export default Cart
