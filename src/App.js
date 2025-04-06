import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Menu from './pages/Menu';

// Lazy load components that will be added later
const Cart = lazy(() => import('./pages/Cart').catch(() => ({ 
  default: () => <Navigate to="/" replace />
})));

const Login = lazy(() => import('./pages/Login').catch(() => ({
  default: () => <Navigate to="/" replace />
})));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        
        {}
        <Route path="/login" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        } />
        <Route path="/cart" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        } />

        {}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;