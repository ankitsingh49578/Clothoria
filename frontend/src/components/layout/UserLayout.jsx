import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className='dark-theme'>
          <Outlet/>
        </main>

        {/* Footer */}
        <Footer/>
    </>
  )
}

export default UserLayout