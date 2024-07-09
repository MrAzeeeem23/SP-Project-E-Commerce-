import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation.jsx'
import Footer from './pages/Auth/Footer.jsx'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <ToastContainer />
      <main className='py-3'>
        <Navigation />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App