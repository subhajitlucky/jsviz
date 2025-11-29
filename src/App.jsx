import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useStore from './store/useStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Topic from './pages/Topic';
import Practice from './pages/Practice';
import Problem from './pages/Problem';
import Playground from './pages/Playground';

console.log('App.jsx loaded - all pages imported');

function App() {
  const { theme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-300" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/topic/:id" element={<Topic />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/problem/:id" element={<Problem />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
