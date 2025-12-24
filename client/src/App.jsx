// client/src/App.jsx
import React, { useState, useEffect } from 'react'; // 👈 Thêm useEffect vào đây
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Cart from './components/Cart'; 
import ProductManagement from './components/ProductManagement';
import ProductForm from './components/ProductForm';
//  update 19122026
import OrdersAdmin from './components/OrdersAdmin';
import Login from './components/Login';

function App() {
  const [cart, setCart] = useState([]); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // return (
  //   <Router>
  //     <div className="app-container">
  //       <Header cartCount={cart.length} />
        
  //       <main style={{ minHeight: '80vh', padding: '20px' }}>
  //         <Routes>
  //           {/* Routes người dùng */}
  //           <Route path="/" element={<ProductList cart={cart} setCart={setCart} />} />
  //           <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

  //           {/* Routes Quản trị (Bài 10) */}
  //           <Route path="/admin" element={
  //               <div style={{ textAlign: 'center' }}>
  //                   <h2>Bảng Điều Khiển Admin</h2>
  //                   <div style={adminMenu}>
  //                       <Link to="/admin/products" style={adminCard}>📦 Quản lý Sản phẩm</Link>
  //                       <Link to="/admin/orders" style={adminCard}>📋 Quản lý Đơn hàng</Link>
  //                   </div>
  //               </div>
  //           } />
  //           <Route path="/admin/products" element={<ProductManagement />} />
  //           <Route path="/admin/products/create" element={<ProductForm />} />
  //           <Route path="/admin/products/edit/:id" element={<ProductForm />} />
  //           <Route path="/admin/orders" element={<OrdersAdmin />} />
  //         </Routes>
  //       </main>

  //       <Footer />
  //     </div>
  //   </Router>
  // );
  return (
  <Router>
    {/* Áp dụng style appContainer để đảm bảo flexbox và chiều cao 100vh */}
    <div className="app-container" style={appContainer}>
      
      <Header cartCount={cart.length} user={user} onLogout={handleLogout} />
      
      {/* Áp dụng style mainContentStyle để nội dung căn giữa và responsive */}
      <main style={mainContentStyle}>
                   <Routes>
             {/* Routes người dùng */}
             <Route path="/" element={<ProductList cart={cart} setCart={setCart} />} />
             <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
             <Route path="/login" element={<Login setUser={setUser} />} />

             {/* Routes Quản trị (Bài 10) */}
             <Route path="/admin" element={
                <div style={{ textAlign: 'center' }}>
                    <h2>Bảng Điều Khiển Admin</h2>
                    <div style={adminMenu}>
                        <Link to="/admin/products" style={adminCard}>📦 Quản lý Sản phẩm</Link>
                        <Link to="/admin/orders" style={adminCard}>📋 Quản lý Đơn hàng</Link>
                    </div>
                </div>
            } />

{user?.role === 'admin' ? (
    <>
      <Route path="/admin" element={
    <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'white' }}>Bảng Điều Khiển Admin</h2>
        <div style={adminMenu}>
            <Link to="/admin/products" style={adminCard}>📦 Quản lý Sản phẩm</Link>
            <Link to="/admin/orders" style={adminCard}>📋 Quản lý Đơn hàng</Link>
        </div>
    </div>
} />
      <Route path="/admin/products" element={<ProductManagement />} />
      <Route path="/admin/products/create" element={<ProductForm />} />
      
      {/* ⚠️ Đảm bảo dòng này nằm bên trong cụm Admin và đúng cú pháp :id */}
      <Route path="/admin/products/edit/:id" element={<ProductForm />} />
      
      <Route path="/admin/orders" element={<OrdersAdmin />} />
    </>
  ) : (
    <Route path="/admin/*" element={<h2>Vui lòng đăng nhập quyền Admin</h2>} />
  )}
            {/* <Route path="/admin/products" element={<ProductManagement />} />
            <Route path="/admin/products/create" element={<ProductForm />} />
            <Route path="/admin/products/edit/:id" element={<ProductForm />} />
            <Route path="/admin/orders" element={<OrdersAdmin />} /> */}
          </Routes>
      </main>

      <Footer />
    </div>
  </Router>
);
}

// Style cho menu Admin [cite: 69]
const adminMenu = { display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' };
const adminCard = { 
    padding: '30px', border: '2px solid #3498db', borderRadius: '10px', 
    textDecoration: 'none', color: '#3498db', fontWeight: 'bold', fontSize: '1.2rem' 
};

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