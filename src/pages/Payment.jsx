import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Payment.css'

function Payment() {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [address, setAddress] = useState('')

  const totalAmount = getTotalPrice() * 1.02

  const handlePaymentComplete = () => {
    if (!address.trim()) {
      alert('Please enter your delivery address')
      return
    }
    alert(`Payment successful! Your order will be delivered to:\n${address}`)
    clearCart()
    navigate('/reviews')
  }

  if (cartItems.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <section className="payment-section">
      <h2>Payment</h2>
      <div className="payment-container">
        <div className="payment-info">
          <h3>Order Details</h3>
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <span>{item.name} x{item.quantity}</span>
                <span>${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <div className="total-line">
              <span>Subtotal:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="total-line">
              <span>Tax (2%):</span>
              <span>${(getTotalPrice() * 0.02).toFixed(2)}</span>
            </div>
            <div className="total-line final">
              <span>Total Amount:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          {user && (
            <div className="user-info">
              <p><strong>Customer:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          )}
          
          <div className="delivery-section">
            <h3>Delivery Information</h3>

            <div className="form-group">
              <label htmlFor="address">Delivery Address Details:</label>
              <textarea
                id="address"
                placeholder="Enter apartment number, building name, landmark, or any special instructions for delivery"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ minHeight: '100px', width: '100%', padding: '8px', fontFamily: 'inherit' }}
                required
              />
            </div>
          </div>
        </div>

        <div className="qr-section">
          <h3>Scan to Pay</h3>
          <div className="qr-code">
            <img src={`${import.meta.env.BASE_URL}images/my-qr.jpg`} alt="Payment QR code" className="qr-image" />
            <p className="qr-hint">Scan with your phone to pay ${totalAmount.toFixed(2)}</p>
          </div>

          <button className="btn-payment" onClick={handlePaymentComplete}>
            Confirm Payment
          </button>
        </div>
      </div>
    </section>
  )
}

export default Payment
