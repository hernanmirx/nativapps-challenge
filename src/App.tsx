import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
