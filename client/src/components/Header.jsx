// client/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount, user, onLogout }) => {
  return (
    <header style={headerStyle}>
      <div style={navContainer}>
        <h1 style={{ margin: 0 }}>
          <Link to="/" style={logoStyle}>E-SHOP</Link>
        </h1>
        <nav style={navLinks}>
          <Link to="/" style={linkStyle}>Sản Phẩm</Link>
          <Link to="/cart" style={linkStyle}>
             Giỏ Hàng <span style={badgeStyle}>{cartCount}</span>
          </Link>
          
          {/* Kiểm tra nếu có user thì hiện tên và nút Đăng xuất, ngược lại hiện Đăng nhập */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontWeight: 'bold' }}>Chào, {user.username}</span>
              {user.role === 'admin' && (
                <Link to="/admin" style={adminLinkStyle}>Quản Trị</Link>
              )}
              <button onClick={onLogout} style={logoutButtonStyle}>Đăng Xuất</button>
            </div>
          ) : (
            <Link to="/login" style={linkStyle}>Đăng Nhập</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

// Styles
const headerStyle = { backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', padding: '15px 0', position: 'sticky', top: 0, zIndex: 100 };
// const navContainer = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' };
const logoStyle = { color: '#3498db', textDecoration: 'none', fontWeight: 'bold' };
// const navLinks = { display: 'flex', gap: '20px', alignItems: 'center' };
const linkStyle = { textDecoration: 'none', color: '#333', fontWeight: '500' };
const adminLinkStyle = { ...linkStyle, color: '#e74c3c', border: '1px solid #e74c3c', padding: '5px 12px', borderRadius: '4px' };
const badgeStyle = { backgroundColor: '#e74c3c', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8em' };

const navContainer = {
  display: 'flex',
  flexWrap: 'wrap', // Tự động xuống dòng nếu thiếu chỗ
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px'
};

const navLinks = {
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
  marginTop: '10px' // Tạo khoảng cách nhỏ khi bị xuống dòng trên di động
};
const logoutButtonStyle = {
  backgroundColor: '#e74c3c', // Màu đỏ cho nút đăng xuất
  color: 'white',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  transition: 'background 0.3s'
};

// Đảm bảo các style khác như adminLinkStyle cũng đã được định nghĩa
// const adminLinkStyle = {
//   backgroundColor: '#f39c12',
//   color: 'white',
//   textDecoration: 'none',
//   padding: '8px 15px',
//   borderRadius: '5px',
//   fontWeight: 'bold'
// };
export default Header;