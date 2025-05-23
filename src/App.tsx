import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';

const Cart = lazy(() => import('./pages/Cart').catch(() => ({ 
  default: () => <Navigate to="/" replace />
})));

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/cart" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App; 