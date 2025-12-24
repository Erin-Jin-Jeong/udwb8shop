import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersAdmin = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get('http://localhost:5000/api/orders');
            setOrders(response.data);
        };
        fetchOrders();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Danh Sách Đơn Hàng</h2>
            <div style={{ overflowX: 'auto' }}>
                <table style={tableStyle}>
                    <thead>
                        <tr style={{ backgroundColor: '#000000ff' }}>
                            <th>Mã Đơn</th>
                            <th>Ngày Đặt</th>
                            <th>Tổng Tiền</th>
                            <th>Chi Tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td>{order._id}</td>
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                <td>{order.total.toLocaleString()} VNĐ</td>
                                <td>
                                    {order.items.map(item => (
                                        <div key={item.productId}>{item.name} x {item.quantity}</div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const tableStyle = { width: '100%', borderCollapse: 'collapse', textAlign: 'left' };

export default OrdersAdmin;