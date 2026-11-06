import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../utils/api";

export const useVerifyPassword = () => {
  const [loading, setLoading] = useState(false);

  const verifyPassword = async (password) => {
    setLoading(true);
    try {
      await api.post("/users/verify-password", { password });
      return true; // পাসওয়ার্ড সঠিক
    } catch (error) {
      toast.error(error.response?.data?.message || "Incorrect current password");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { verifyPassword, loading };
};