import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const register = (email, password, name) => {
    const newUser = { id: Date.now(), email, name, password }
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }

  const login = (email, password) => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      if (user.email === email && user.password === password) {
        setUser(user)
        return user
      }
    }
    return null
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
