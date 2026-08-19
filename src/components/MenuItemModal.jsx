import { useState } from 'react'
import './MenuItemModal.css'

function MenuItemModal({ item, onClose, onDone, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    onAddToCart({ ...item, quantity })
    setAdded(true)
    setQuantity(1)
    // Show success message then reset
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <img src={`images/${item.image}`} alt={item.name} className="modal-image" />
        <h2>{item.name}</h2>
        <p className="price">{item.price}</p>
        <p className="description">Fresh and delicious {item.name.toLowerCase()} made with premium ingredients.</p>
        
        <div className="quantity-selector">
          <label>Quantity:</label>
          <div className="quantity-controls">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ backgroundColor: '#ff4444', color: 'white', fontSize: '18px', padding: '8px 12px', cursor: 'pointer', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>−</button>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} style={{ width: '60px', textAlign: 'center', fontSize: '18px', padding: '8px', border: '2px solid #ddd', borderRadius: '4px' }} />
            <button onClick={() => setQuantity(quantity + 1)} style={{ backgroundColor: '#ff4444', color: 'white', fontSize: '18px', padding: '8px 12px', cursor: 'pointer', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>+</button>
          </div>
        </div>

        <div className="modal-total">
          <strong>Total: ${(parseFloat(item.price.replace('$', '')) * quantity).toFixed(2)}</strong>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-add-cart" onClick={handleAddToCart} style={{ flex: 1, backgroundColor: added ? '#28a745' : '#ff6b6b', transition: 'all 0.3s' }}>
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
          <button onClick={onDone} style={{ flex: 1, padding: '12px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuItemModal
