// server/index.js

const express = require('express');
// Thư viện Mongoose để kết nối và thao tác với MongoDB
const mongoose = require('mongoose');
// CORS Middleware để cho phép truy cập từ client
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
  // dữ liệu bắt buộc và tên sản phẩm phải duy nhất
  // (Unique sẽ giúp tránh trùng tên sản phẩm)
  // khuyen dùng _id để định danh chính
  //  đặt tên sản phẩm có thể kèm theo id hoặc mã riêng, ví dụ như: Laptop Dell XPS 13 - 9310
  description: { type: String, required: true },
  // mô tả sản phẩm, not thing impotain here
  price: { type: Number, required: true, min: 0 },
  // giá sản phẩm, không được âm
  // nếu âm sẽ báo lỗi Validation Mongoose
  stock: { type: Number, required: true, min: 0 },
  // số lượng tồn kho, không được âm
  // nếu âm sẽ báo lỗi Validation Mongoose
  imageUrl: { type: String, default: 'placeholder.jpg' }
  // URL ảnh sản phẩm, có thể để mặc định
  // hỗ trợ các định dạng ảnh phổ biến như .jpg, .png, .jpeg, .svg
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

// server/index.js (Thêm vào phần ĐỊNH NGHĨA ROUTES)

// ... (GET và POST đã có)

// PUT: Cập nhật sản phẩm theo ID
app.put('/api/products/:id', async (req, res) => {
  try {
    // { new: true } trả về document sau khi cập nhật
    // await Product là Promise nên cần await
    // req.body chứa dữ liệu cập nhật từ client
    // param id lấy từ URL, params là object chứa tất cả tham số động của route cụ thể là :id
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // nếu không tìm thấy sản phẩm thì trả về 404
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    console.error("Lỗi PUT Product:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Xóa sản phẩm theo ID
app.delete('/api/products/:id', async (req, res) => {
  
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    // nếu không tìm thấy sản phẩm thì trả về 404
    if (!result) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Lỗi DELETE Product:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// ... (Phần chạy Server)


// Chạy Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
