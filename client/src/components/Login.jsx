import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      alert("Đăng nhập thành công!");
      navigate(res.data.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center', color: 'white' }}>
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} style={{ padding: '10px' }} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} style={{ padding: '10px' }} />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', cursor: 'pointer' }}>
          Vào hệ thống
        </button>
      </form>
    </div>
  );
};

// ⚠️ QUAN TRỌNG: Dòng này phải có ở cuối file
export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ setUser }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
//       // Lưu thông tin vào localStorage để không bị mất khi F5
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data));
      
//       setUser(res.data); // Cập nhật state toàn cục
//       alert("Đăng nhập thành công!");
//       navigate('/'); // Về trang chủ
//     } catch (err) {
//       alert("Đăng nhập thất bại!");
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd' }}>
//       <h2>Đăng Nhập</h2>
//       <form onSubmit={handleLogin}>
//         <input type="text" placeholder="Tên đăng nhập" onChange={e => setUsername(e.target.value)} style={inputStyle} />
//         <input type="password" placeholder="Mật khẩu" onChange={e => setPassword(e.target.value)} style={inputStyle} />
//         <button type="submit" style={buttonStyle}>Vào Hệ Thống</button>
//       </form>
//     </div>
//   );
// };

// const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px' };
// const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none' };

// export default Login;