import { Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home            from './pages/Home'
import Inventory       from './pages/Inventory'
import CreditApplication from './pages/CreditApplication'
import About           from './pages/About'
import Contact         from './pages/Contact'

import StaffLogin      from './admin/StaffLogin'
import Dashboard       from './admin/Dashboard'
import ClientList      from './admin/ClientList'
import ClientDetail    from './admin/ClientDetail'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/credit"    element={<CreditApplication />} />
        <Route path="/about"     element={<About />} />
        <Route path="/contact"   element={<Contact />} />

        <Route path="/admin/login" element={<StaffLogin />} />

        <Route path="/admin" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/admin/clients" element={
          <ProtectedRoute><ClientList /></ProtectedRoute>
        } />
        <Route path="/admin/clients/:id" element={
          <ProtectedRoute><ClientDetail /></ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
