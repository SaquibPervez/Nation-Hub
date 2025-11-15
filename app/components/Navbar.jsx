import React from 'react'
import ThemeToggleButton from './ThemeToggleButton'
function Navbar() {
  return (
    <nav >
        <div className='bg-gray-50 dark:bg-gray-700 flex justify-between items-center py-4 shadow-sm px-5 sm:px-20 z-10'>
            <span className='text-md sm:text-2xl font-semibold'>Where in the world?</span>
             <ThemeToggleButton />
        </div>
    </nav>
  )
}

export default Navbar