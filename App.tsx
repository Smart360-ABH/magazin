import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MarketProvider } from './context/MarketContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';
import { IntroAnimation } from './components/IntroAnimation';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Optional: Check if we've already shown the intro in this session to avoid annoyance
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    // Uncomment the next line if you only want it to show once per session
    // if (hasSeenIntro) setShowIntro(false);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  return (
    <MarketProvider>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <Router>
        <Routes>
          {/* Admin Route (No Layout for full screen control) */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Main Routes */}
          <Route path="*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Catalog />} /> {/* Reuse catalog for demo */}
                <Route path="/profile" element={<div className="p-8 text-center text-xl">Личный кабинет (Демо)</div>} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </MarketProvider>
  );
};

export default App;