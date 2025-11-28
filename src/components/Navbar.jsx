import React from 'react'

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="main navigation">
        <div className="flex items-center justify-between py-4">
          {/* Brand on the left */}
          <div className="flex-shrink-0">
            <a href="/" className="font-semibold text-lg no-underline">jsviz</a>
          </div>

          {/* Nav items on the right */}
          {/* visible on all sizes; previously hidden on small screens via `hidden md:flex` */}
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            <li><a href="/concepts" className="no-underline">concept</a></li>
            <li><a href="/compiler" className="no-underline">compiler</a></li>
            <li><a href="/about" className="no-underline">about</a></li>
          </ul>

          {/* Small-screen fallback removed — items now visible on all sizes */}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
