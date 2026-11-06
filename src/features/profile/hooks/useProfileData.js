import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../utils/api";

export const useProfileData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/protected");
        setUserData(res.data.user);
      } catch (error) {
        toast.error("Session expired. Please login again.");
        localStorage.clear();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  return { userData, setUserData, loading };
};