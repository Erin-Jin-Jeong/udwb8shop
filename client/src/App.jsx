// client/src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import các Components sẽ tạo sau
import ProductList from './components/ProductList';
import Cart from './components/Cart'; 

function App() {
  // State quản lý giỏ hàng (chuyển sang Bước 9)
  const [cart, setCart] = useState([]); 

  return (
    <Router>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>E-Shop</h1>
            <div>
              <Link to="/" style={{ marginRight: '20px', textDecoration: 'none' }}>Sản Phẩm</Link>
              <Link to="/cart" style={{ textDecoration: 'none' }}>
                Giỏ Hàng ({cart.reduce((sum, item) => sum + item.quantity, 0)}) 🛒
              </Link>
            </div>
          </nav>
        </header>
        
        <Routes>
          {/* Trang Chủ: Danh sách sản phẩm */}
          {/* ⚠️ Bước 9: Sẽ truyền props onAddToCart sau */}
          <Route path="/" element={<ProductList cart={cart} setCart={setCart} />} /> 
          
          {/* Trang Giỏ hàng */}
          {/* ⚠️ Bước 9: Sẽ truyền props cart và setCart sau */}
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;