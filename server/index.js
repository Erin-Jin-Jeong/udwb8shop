// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000; 

// Middleware - RẤT QUAN TRỌNG
app.use(cors()); 
app.use(express.json()); // BẮT BUỘC có để đọc dữ liệu POST/PUT

// 1. KẾT NỐI MONGODB
// Thay thế bằng chuỗi kết nối của bạn (Ví dụ: tên database là ecommerceDB)
const MONGODB_URI = 'mongodb://localhost:27017/ecommerceDB'; 

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Failed to connect to MongoDB:', err));

// 2. ĐỊNH NGHĨA MODEL SẢN PHẨM
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, default: 'placeholder.jpg' }
});

const Product = mongoose.model('Product', productSchema);

// 3. ĐỊNH NGHĨA ROUTES (API Endpoints)
// GET: Lấy TẤT CẢ sản phẩm
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Thêm sản phẩm mới (Để test tính năng CRUD)
app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        // Lỗi Validation Mongoose sẽ rơi vào đây (Ví dụ: thiếu name hoặc price)
        console.error("Lỗi POST Product:", error.message);
        res.status(400).json({ message: error.message });
    }
});

// Chạy Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
