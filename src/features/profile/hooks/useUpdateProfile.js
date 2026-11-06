import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../utils/api";

export const useUpdateProfile = (setUserData) => {
  const [loading, setLoading] = useState(false);

  const updateProfile = async (formData) => {
    setLoading(true);
    try {
      const res = await api.put("/users/update", formData);
      setUserData(res.data);
      
      // লোকাল স্টোরেজে নতুন টোকেন ও ইউজার ইনফো আপডেট
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
};