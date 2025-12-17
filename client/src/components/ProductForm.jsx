// client/src/components/ProductForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/products';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  
  const { id } = useParams(); // Lấy ID nếu đang ở chế độ sửa
  const navigate = useNavigate();

  // useEffect để tải dữ liệu sản phẩm nếu đang ở chế độ EDIT
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`${API_URL}/${id}`);
          const data = response.data;
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price);
          setStock(data.stock);
          setImageUrl(data.imageUrl);
        } catch (error) {
          console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, description, price, stock, imageUrl };

    try {
      if (id) {
        // PUT: Cập nhật sản phẩm
        await axios.put(`${API_URL}/${id}`, productData);
        alert('Cập nhật sản phẩm thành công!');
      } else {
        // POST: Tạo sản phẩm mới
        await axios.post(API_URL, productData);
        alert('Tạo sản phẩm mới thành công!');
      }
      
      // Chuyển hướng về trang quản lý sau khi submit
      navigate('/admin/products'); 

    } catch (error) {
      console.error('Lỗi khi lưu sản phẩm:', error.response.data.message);
      alert(`Lỗi: ${error.response.data.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>{id ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        
        {/* Tên Sản Phẩm */}
        <label style={labelStyle}>Tên Sản Phẩm:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
        
        {/* Giá */}
        <label style={labelStyle}>Giá (VNĐ):</label>
        <input type="number" min="0" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required style={inputStyle} />
        
        {/* Tồn Kho */}
        <label style={labelStyle}>Tồn Kho:</label>
        <input type="number" min="0" value={stock} onChange={(e) => setStock(parseInt(e.target.value))} required style={inputStyle} />
        
        {/* URL/Tên File Ảnh */}
        <label style={labelStyle}>Tên File Ảnh:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={inputStyle} />
        
        {/* Mô Tả */}
        <label style={labelStyle}>Mô Tả:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="5" style={inputStyle} />

        <button type="submit" style={buttonStyle}>
          {id ? 'Cập Nhật' : 'Thêm Mới'}
        </button>
        <button type="button" onClick={() => navigate('/admin/products')} style={cancelButtonStyle}>
            Hủy
        </button>
      </form>
    </div>
  );
};

// CSS
const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const labelStyle = { fontWeight: 'bold', marginTop: '10px' };
const inputStyle = { padding: '10px', border: '1px solid #ccc', borderRadius: '4px' };
const buttonStyle = { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' };
const cancelButtonStyle = { padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' };

export default ProductForm;