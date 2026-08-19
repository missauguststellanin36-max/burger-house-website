import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuItemModal from '../components/MenuItemModal'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const menuItems = [
  { id: 1, name: 'Classic Burger', price: '$2.49', image: 'burger.jpg' },
  { id: 2, name: 'French Fries', price: '$1.99', image: 'French_Fries.jpg' },
  { id: 3, name: 'Chicken Burger', price: '$1.99', image: 'chicken_burger.jpg' },
  { id: 4, name: 'Crispy Chicken Wings', price: '$4.99', image: 'CrispyChicken_Wings.jpg' },
  { id: 5, name: 'Cheesy Rimen', price: '$5.49', image: 'Cheesy_Rimen.jpg' },
  { id: 6, name: 'Fried Chicken', price: '$4.99', image: 'Fried_Chicken.jpg' },
  { id: 7, name: 'Tteokbokki', price: '$3.99', image: 'Tteokbokki.jpg' },
  { id: 8, name: 'Korn Dog', price: '$2.99', image: 'Korn_Dog.jpg' },
  { id: 9, name: 'Cold Drink (Cola)', price: '$0.99', image: 'cola.jpg' },
  { id: 10, name: 'Cold Drink (Sprite)', price: '$0.99', image: 'Sprite.jpg' },
  { id: 11, name: 'Chocolate Milkshake', price: '$1.99', image: 'Chocolate_Milkshake.jpg' },
]

function Menu() {
  const [selectedItem, setSelectedItem] = useState(null)
  const { addToCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <section className="menu" id="menu">
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <h2>Please Log In to Order</h2>
          <p>You need to login or register to view the menu and place orders.</p>
          <button onClick={() => navigate('/login')} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}>
            Login
          </button>
          <button onClick={() => navigate('/register')} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Register
          </button>
        </div>
      </section>
    )
  }

  const handleAddToCart = (item) => {
    addToCart(item)
    alert(`${item.name} added to cart!`)
  }

  return (
    <>
      <section className="menu" id="menu">
        <h2>Popular Menu</h2>
        <div className="menu-container">
          {menuItems.map(item => (
            <div key={item.id} className="card" onClick={() => setSelectedItem(item)} style={{ cursor: 'pointer' }}>
              <img src={`images/${item.image}`} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      </section>
      {selectedItem && (
        <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={handleAddToCart} />
      )}
    </>
  )
}

export default Menu
