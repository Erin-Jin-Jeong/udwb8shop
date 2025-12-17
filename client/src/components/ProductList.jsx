// client/src/components/ProductList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';


// ⚠️ Bắt đầu bằng việc Import tất cả ảnh từ thư mục assets
// Tính năng Glob Import của Vite: tạo một đối tượng (object) chứa tất cả các module ảnh
const imageModules = import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', { eager: true });

// Hàm ánh xạ tên file thành URL
const getImageUrl = (filename) => {
    // Tìm URL trong object imageModules
    // Các key sẽ có dạng: "../assets/tainghe-x2.png"
    const path = `../assets/${filename}`;
    const module = imageModules[path];
    
    // Nếu tìm thấy, trả về URL mặc định (default export của Vite)
    if (module && module.default) {
        return module.default;
    }
    // Trả về placeholder nếu không tìm thấy
    return 'https://via.placeholder.com/200?text=No+Image';
};


const API_URL = 'http://localhost:5000/api/products';


// Nhận props cart và setCart từ App.jsx
const ProductList = ({ cart, setCart }) => { 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // READ: Lấy danh sách sản phẩm từ Backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // [] đảm bảo chỉ chạy 1 lần khi load trang

  // Hàm Thêm sản phẩm vào giỏ hàng (Tạm thời)
  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.productId === product._id);
    
    if (existingItem) {
      // Tăng số lượng nếu đã có
      setCart(cart.map(item =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Thêm mới nếu chưa có
      setCart([...cart, {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1
      }]);
    }
    alert(`Đã thêm 1 x ${product.name} vào giỏ hàng!`);
  };

  if (loading) return <h2 style={{ textAlign: 'center' }}>Đang tải sản phẩm...</h2>;
  if (products.length === 0) return <h2 style={{ textAlign: 'center' }}>Không có sản phẩm nào.</h2>;

  return (
    <div>
      <h2>Tất Cả Sản Phẩm</h2>
      <div style={flexCenter}>
        {products.map(product => (
          <div key={product._id} style={cardStyle}>
            {/* Ảnh sản phẩm (chỉ là placeholder) */}
            {/* <div style={imagePlaceholderStyle}>Ảnh</div> */}
            {/* // Lấy URL thực tế từ hàm getImageUrl */}
            <img 
            src={getImageUrl(product.imageUrl)} 
            alt={product.name} 
            style={imageStyle} 
            />
            <h3>{product.name}</h3>
            <p style={{ color: '#dc3545', fontWeight: 'bold' }}>
                {product.price.toLocaleString('vi-VN')} VNĐ
            </p>
            <p style={{ fontSize: '0.9em', color: '#6c757d' }}>Tồn kho: {product.stock}</p>
            
            <button 
                style={buttonStyle} 
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0} 
            >
              {product.stock > 0 ? 'Thêm vào Giỏ Hàng' : 'Hết Hàng'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// CSS Tối giản
const gridStyle = { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
    gap: '20px' 
};
const flexCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    

};

const cardStyle = { 
    // ... giữ nguyên hoặc thêm chiều cao cố định cho card nếu cần
    border: '1px solid #ddd', 
    padding: '15px', 
    borderRadius: '8px', 
    textAlign: 'center', 
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',           // Thêm display flex để bố cục các thành phần bên trong
    flexDirection: 'column',
    justifyContent: 'space-between'
};
const imagePlaceholderStyle = { 
    width: '100%', 
    height: '180px', 
    backgroundColor: '#f8f9fa', 
    marginBottom: '10px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: '4px' 
};
const buttonStyle = { 
    padding: '10px 20px', 
    backgroundColor: '#007bff', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    marginTop: '10px',
    width: '100%'
};
// Thêm hoặc sửa lại imageStyle
const imageStyle = { 
    width: '100%', 
    height: '250px',           // ⚠️ Đặt chiều cao cố định
    objectFit: 'cover',        // ⚠️ BẮT BUỘC có để ảnh không bị méo
    borderRadius: '4px',
    marginBottom: '10px'
};

export default ProductList;