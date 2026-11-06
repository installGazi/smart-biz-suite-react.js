import axios from "axios";

// Vite অটোমেটিক বুঝে নেবে এটা প্রোডাকশন নাকি ডেভেলপমেন্ট
const isProduction = import.meta.env.MODE === "production";

// আপনার Render URL এখানে বসানো হলো
const baseURL = isProduction 
  ? "https://smart-biz-suite-express-js.onrender.com/api" 
  : "http://localhost:5000/api"; 

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// প্রতিটি request-এ token header-এ পাঠান
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;