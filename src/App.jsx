import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import Navbar               from './components/Navbar'
import ProtectedRoute       from './components/ProtectedRoute'

import Home                 from './pages/Home'
import Gate                 from './components/Gate'

// import Inventory         from './pages/Inventory'

import CreditApplication    from './pages/CreditApplication'
import About                from './pages/About'
import Contact              from './pages/Contact'
import Offers               from './pages/Offers'
import FAQs                 from './pages/FAQs'
import Privacy              from './pages/Privacy'
import Terms                from './pages/Terms'

import StaffLogin           from './admin/StaffLogin'
import Dashboard            from './admin/Dashboard'
import ClientList           from './admin/ClientList'
import ClientDetail         from './admin/ClientDetail'
import InventoryManager     from './admin/InventoryManager'
import ContactSubmissions   from './admin/ContactSubmissions'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <Gate>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/"          element={<Home />} />

          {/* <Route path="/inventory" element={<Inventory />} />*/}
          
          <Route path="/credit"    element={<CreditApplication />} />
          <Route path="/about"     element={<About />} />
          <Route path="/contact"   element={<Contact />} />
          <Route path="/offers"    element={<Offers />} />
          <Route path="/faqs"      element={<FAQs />} />
          <Route path="/privacy"   element={<Privacy />} />
          <Route path="/terms"     element={<Terms />} />

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

          {/*

          <Route path="/admin/inventory" element={
            <ProtectedRoute><InventoryManager /></ProtectedRoute>
          } />

          */}

          <Route path="/admin/contacts" element={
            <ProtectedRoute><ContactSubmissions /></ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Gate>
    </>
  )
}