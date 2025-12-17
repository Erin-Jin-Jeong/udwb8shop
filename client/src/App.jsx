// client/src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import các Components sẽ tạo sau
import ProductList from './components/ProductList';
import Cart from './components/Cart'; 
import ProductManagement from './components/ProductManagement';
import ProductForm from './components/ProductForm';

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
              {/* <Link to="/admin/products" style={{ textDecoration: 'none', color: '#dc3545', fontWeight: 'bold' }}>Admin</Link> */}
              {/* <Link to="/user" style={{ marginRight: '20px', textDecoration: 'none' }}>Người dùng</Link> */}
              <Link to="/admin/products" style={{ marginRight: '20px',color: '#f0f0f0ff', textDecoration: 'none' }}>Admin</Link>
              
              <Link to="/" style={{ marginRight: '20px',color: '#f0f0f0ff', textDecoration: 'none' }}>Sản Phẩm</Link>

              <Link to="/cart" style={{ color: '#f0f0f0ff', textDecoration: 'none' }}>
                🛒 ({cart.reduce((sum, item) => sum + item.quantity, 0)}) 
              </Link>
            </div>
          </nav>
        </header>
        

       <Routes>
          {/* USER INTERFACE ROUTES */}
          {/* Trang chủ - Danh sách sản phẩm */}
          <Route path="/" element={<ProductList cart={cart} setCart={setCart} />} /> 
          {/* Trang Giỏ hàng */}
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} /> 

          {/* ADMIN INTERFACE ROUTES */}
          {/* Trang quản lý danh sách (READ/DELETE) */}
          <Route path="/admin/products" element={<ProductManagement />} /> 
          {/* Trang thêm sản phẩm mới (CREATE) */}
          <Route path="/admin/products/create" element={<ProductForm />} /> 
          {/* Trang chỉnh sửa sản phẩm (UPDATE - dùng ID) */}
          <Route path="/admin/products/edit/:id" element={<ProductForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;