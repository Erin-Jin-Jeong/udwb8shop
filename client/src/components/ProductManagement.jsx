// client/src/components/ProductManagement.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/products';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


// Hàm lấy Token từ localStorage
  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };


  // READ: Hàm lấy danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE: Hàm xóa sản phẩm
  // Ví dụ khi xóa sản phẩm
// const token = localStorage.getItem('token');
// await axios.delete(`http://localhost:5000/api/products/${id}`, {
//   headers: { Authorization: `Bearer ${token}` }
// });
  const handleDelete = async (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm: ${name} không?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`, getAuthConfig());
        alert(`Sản phẩm ${name} đã được xóa!`);
        // Cập nhật lại danh sách sau khi xóa thành công
        fetchProducts(); 
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        alert('Không thể xóa sản phẩm. Vui lòng kiểm tra console.');
      }
    }
  };

  if (loading) return <h3 style={{ textAlign: 'center' }}>Đang tải dữ liệu quản trị...</h3>;

  return (
    <div style={flexCenter}>
      <div style={headerStyle}>
        <h2>Quản Lý Sản Phẩm</h2>
        {/* Link chuyển đến trang tạo sản phẩm mới */}
        <Link to="/admin/products/create" style={createLinkStyle}>
          + Thêm Sản Phẩm Mới
        </Link>
      </div>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ width: '5%' }}>ID</th>
            <th style={{ width: '30%' }}>Tên Sản Phẩm</th>
            <th style={{ width: '15%', textAlign: 'right' }}>Giá (VNĐ)</th>
            <th style={{ width: '15%', textAlign: 'right' }}>Tồn Kho</th>
            <th style={{ width: '25%' }}>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td >{index + 1}</td>
              <td >{product.name}</td>
              <td style={{ textAlign: 'right' }}>{product.price.toLocaleString('vi-VN')}</td>
              <td style={{ textAlign: 'right' }}>{product.stock}</td>
              <td >
                {/* Link chuyển đến trang sửa sản phẩm (Truyền ID) */}
                <Link to={`/admin/products/edit/${product._id}`} className="btn-edit"> <button style={editButtonStyle}>Sửa</button>
 
</Link>
                {/* Nút Xóa */}
                <button 
                  onClick={() => handleDelete(product._id, product.name)}
                  style={deleteButtonStyle}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// CSS
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };
const createLinkStyle = { 
    backgroundColor: '#28a745', 
    color: 'white', 
    padding: '10px 15px', 
    borderRadius: '5px', 
    textDecoration: 'none',
    fontWeight: 'bold'
};
const tableStyle = { width: '100%', borderCollapse: 'collapse',minWidth: '600px' };
const editButtonStyle = { 
    backgroundColor: '#ffc107', 
    color: 'black', 
    border: 'none', 
    padding: '5px 10px', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    marginRight: '10px',
    textDecoration: 'none'
};
const deleteButtonStyle = { 
    backgroundColor: '#dc3545', 
    color: 'white', 
    border: 'none', 
    padding: '5px 10px', 
    borderRadius: '4px', 
    cursor: 'pointer' 
};
const flexCenter = {
    display:'inline-block',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    paddingLeft: '20%'
};

export default ProductManagement;