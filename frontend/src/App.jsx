import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation.jsx'
import Footer from './pages/Auth/Footer.jsx'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
// import Scrolltop from './Utils/scrolltop.jsx'

function App() {
  return (
    <>
      <ToastContainer />
      <main className='py-0'>
        <Navigation />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App