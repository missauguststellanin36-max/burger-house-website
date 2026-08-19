import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    const existingItem = cartItems.find(i => i.id === item.id)
    if (existingItem) {
      setCartItems(cartItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      ))
    } else {
      setCartItems([...cartItems, { ...item, notes: '' }])
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(i => i.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId)
    } else {
      setCartItems(cartItems.map(i =>
        i.id === itemId ? { ...i, quantity } : i
      ))
    }
  }

  const updateNotes = (itemId, notes) => {
    setCartItems(cartItems.map(i =>
      i.id === itemId ? { ...i, notes } : i
    ))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0)
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, updateNotes, getTotalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
