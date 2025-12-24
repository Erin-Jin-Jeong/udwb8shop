// client/src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Cart from './components/Cart'; 
import ProductManagement from './components/ProductManagement';
import ProductForm from './components/ProductForm';
//  update 19122026
import OrdersAdmin from './components/OrdersAdmin';

function App() {
  const [cart, setCart] = useState([]); 
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div style={appContainer}>
        {/* Header luôn hiển thị ở trên cùng */}
        <Header cartCount={totalItems} />

        {/* Phần nội dung chính sẽ thay đổi tùy theo URL */}
        <main style={mainContentStyle}>
          <Routes>
            <Route path="/" element={<ProductList cart={cart} setCart={setCart} />} /> 
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} /> 
            <Route path="/admin/products" element={<ProductManagement />} /> 
            <Route path="/admin/products/create" element={<ProductForm />} /> 
            <Route path="/admin/products/edit/:id" element={<ProductForm />} />
          </Routes>
        </main>

        {/* Footer luôn hiển thị ở dưới cùng */}
        <Footer />
      </div>
    </Router>
  );
}

// CSS để đẩy Footer xuống đáy trang nếu nội dung ít
// const appContainer = {
//   display: 'flex',
//   flexDirection: 'column',
//   minHeight: '100vh'
// };

// const mainContentStyle = {
//   flex: 1,
//   maxWidth: '1200px',
//   width: '100%',
//   margin: '0 auto',
//   padding: '40px 20px'
// };

// client/src/App.jsx

const appContainer = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100vw', // Đảm bảo rộng toàn màn hình
  overflowX: 'hidden' // Chống vỡ khung chiều ngang
};

const mainContentStyle = {
  flex: 1,
  width: '100%',
  maxWidth: '1200px', // Giới hạn độ rộng tối đa để không bị quá loãng trên màn hình lớn
  margin: '0 auto',
  padding: '20px',    // Khoảng cách an toàn cho thiết bị di động
};
export default App;