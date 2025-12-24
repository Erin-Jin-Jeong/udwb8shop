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

// fix24122026 login admin start
//  user login
// server/index.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "CHIEU_KHOA_BAO_MAT_CUA_BAN"; // Nên để trong file .env

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' } // 'user' hoặc 'admin'
});

const User = mongoose.model('User', userSchema);
// Định nghĩa Schema cho Admin (nếu chưa có)


const verifyAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: "Không có token!" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err || decoded.role !== 'admin') {
      return res.status(401).json({ message: "Bạn không có quyền Admin!" });
    }
    next(); // Hợp lệ thì cho phép đi tiếp
  });
};



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

// fix19122026
// server/index.js - Thêm vào phần PRODUCT ROUTES

// Định nghĩa Schema cho Đơn hàng (nếu chưa có)
const orderSchema = new mongoose.Schema({
    userId: String,
    items: Array,
    total: Number,
    createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model("Order", orderSchema);

// API: Lấy danh sách tất cả đơn hàng cho Admin [cite: 72]
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }); // Mới nhất lên đầu
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// fix19122026 e


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







// api login admin 24122026 - start
// Đăng ký tài khoản mới
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    res.status(400).json({ message: "Tên đăng nhập đã tồn tại!" });
  }
});

// Đăng nhập
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    // Tạo Token
    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      SECRET_KEY, 
      { expiresIn: '1h' }
    );
    res.json({ token, username: user.username, role: user.role });
  } else {
    res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
  }
});
// ... (Phần chạy Server)
// server/index.js

// API Xóa sản phẩm
app.delete('/api/products/:id', verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API Cập nhật sản phẩm
app.put('/api/products/:id', verifyAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Trả về dữ liệu mới nhất sau khi sửa
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Chạy Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
