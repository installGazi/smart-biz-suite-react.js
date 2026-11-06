import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../../utils/api";

export const useAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // সরাসরি ব্যাকএন্ডে কল দিচ্ছি। 
        // যদি অ্যাডমিন হয়, তবে ডেটা আসবে এবং isAdmin true হবে।
        // যদি অ্যাডমিন না হয়, ব্যাকএন্ড 403 Forbidden দেবে এবং catch ব্লকে যাবে।
        const res = await api.get("/users/all");
        setUsers(res.data.users);
        setIsAdmin(true);
      } catch (error) {
        // সাধারণ ইউজার হলে এখানে আসবে, কোনো ডেটা দেখাবে না
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, []);

  // ব্লক, আনব্লক, ওয়ার্ন এবং ডিলিট লজিক
  const handleAction = async (userId, action) => {
    try {
      if (action === "delete") {
        if (!window.confirm("WARNING: Are you sure you want to delete this user permanently?")) return;
        await api.delete(`/users/delete/${userId}`);
        setUsers(users.filter((u) => u._id !== userId));
        toast.success("User terminated from database.");
      } else {
        const res = await api.put(`/users/block/${userId}`, { action });
        setUsers(users.map((u) => (u._id === userId ? res.data.user : u)));
        toast.success(res.data.message || "Action successful");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  return { users, loading, isAdmin, handleAction };
};