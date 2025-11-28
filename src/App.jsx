import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    <Navbar />
      <main>
        <Home />
      </main>

      <Footer />
    </>
  )
}

export default App
