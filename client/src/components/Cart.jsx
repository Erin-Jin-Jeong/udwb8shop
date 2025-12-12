// client/src/components/Cart.jsx

import React from 'react';

// Nhận props cart và setCart từ App.jsx
const Cart = ({ cart, setCart }) => {

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };
  
  // Xử lý thay đổi số lượng
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
        removeFromCart(productId); // Xóa nếu số lượng là 0
        return;
    }
    setCart(cart.map(item =>
        item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
    ));
  };

  // Tính tổng tiền
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Giỏ Hàng Của Bạn</h2>
      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#6c757d' }}>
            Giỏ hàng trống. Hãy quay lại trang sản phẩm để thêm hàng!
        </p>
      ) : (
        <>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Sản phẩm</th>
                <th style={{ width: '15%' }}>Giá</th>
                <th style={{ width: '20%' }}>Số lượng</th>
                <th style={{ width: '15%' }}>Tổng</th>
                <th style={{ width: '10%' }}></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.productId}>
                  <td>{item.name}</td>
                  <td style={{ textAlign: 'right' }}>
                    {item.price.toLocaleString('vi-VN')} VNĐ
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                      style={inputQtyStyle}
                    />
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    {(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => removeFromCart(item.productId)} style={removeButtonStyle}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={totalStyle}>
            <strong>Tổng Cộng: {totalAmount.toLocaleString('vi-VN')} VNĐ</strong>
            <button style={checkoutButtonStyle}>Tiến Hành Thanh Toán</button>
          </div>
        </>
      )}
    </div>
  );
};

// CSS Tối giản
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const inputQtyStyle = { width: '60px', padding: '5px', textAlign: 'center' };
const removeButtonStyle = { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' };
const totalStyle = { 
    marginTop: '20px', 
    paddingTop: '10px', 
    borderTop: '2px solid #333', 
    display: 'flex', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    gap: '20px'
};
const checkoutButtonStyle = {
    padding: '10px 20px', 
    backgroundColor: '#28a745', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer'
};

export default Cart;