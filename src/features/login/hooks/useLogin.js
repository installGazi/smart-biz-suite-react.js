import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../utils/api";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post("/users/login", formData);
      
      // টোকেন এবং রোল লোকাল স্টোরেজে সেভ
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Login successful! Welcome back.");
      
      // রোল অনুযায়ী রিডাইরেক্ট (অ্যাডমিন নাকি ইউজার)
      if (res.data.role === "admin") {
        window.location.href = "/adminpanel";
      } else {
        window.location.href = "/profile";
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading };
};