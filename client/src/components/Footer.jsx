// client/src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>© 2025 E-Shop Project - Bài Tập 9: Admin Dashboard</p>
      <p>Hệ thống quản lý bán hàng Full-stack MERN</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#2c3e50',
  color: 'white',
  textAlign: 'center',
  padding: '20px 0',
  marginTop: '50px',
  borderTop: '5px solid #3498db'
};

export default Footer;