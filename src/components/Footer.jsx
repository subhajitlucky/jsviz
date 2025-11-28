import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-sm text-center">© {new Date().getFullYear()} jsviz — Footer area (layout only)</div>
      </div>
    </footer>
  )
}

export default Footer
