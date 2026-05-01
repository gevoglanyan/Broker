import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [staff, setStaff] = useState(null)

  // Connect Supabase
  
  const login = async (email, password) => {
    if (email === 'staff@placeholder.com' && password === 'password') {
      setStaff({ email })
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const logout = () => setStaff(null)

  return (
    <AuthContext.Provider value={{ staff, loading: false, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

