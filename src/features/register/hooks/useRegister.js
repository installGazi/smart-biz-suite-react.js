import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../utils/api";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post("/users/register", formData);
      
      // টোকেন এবং রোল লোকাল স্টোরেজে সেভ
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Registration successful! Welcome aboard.");
      
      // সফলভাবে রেজিস্ট্রেশন হলে প্রোফাইলে নিয়ে যাবে
      window.location.href = "/profile"; 
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading };
};