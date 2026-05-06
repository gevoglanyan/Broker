import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { staff, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--muted)', fontFamily: 'Outfit, sans-serif' }}>Loading...</p>
      </div>
    )
  }

  if (!staff) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}