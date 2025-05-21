import React from 'react'
import Topbar from '../layout/Topbar'
import Navbar from './Navbar'
import CartDrawer from '../layout/CartDrawer'

const Header = () => {
  return (
    <header className='border-b border-gray-200 dark:border-gray-700'>
        {/* top bar */}
        <Topbar/>

        {/* nav bar */}
        <Navbar />
        
        {/* cart drawer */}
        {/* <CartDrawer/> */}
    </header>
  )
}

export default Header