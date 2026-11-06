import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import TestApi from './pages/TestApi';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import AdminPanel from './pages/AdminPanel';
import GlobalNews from './pages/GlobalNews';
import Chat from './pages/Chat';
import Booking from './pages/Booking';
import Payment from './pages/Payment'; 

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-16 min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testapi" element={<TestApi />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/globalnews" element={<GlobalNews />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} /> 
        </Routes>
      </main>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </BrowserRouter>
  );
};

export default App;