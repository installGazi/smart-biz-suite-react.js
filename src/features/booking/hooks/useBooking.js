import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../utils/api";

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitBooking = async (bookingData) => {
    setLoading(true);
    try {
      await api.post("/bookings", bookingData);
      toast.success("Booking created successfully! Please proceed to payment.");
      navigate("/payment"); // বুকিং সফল হলে পেমেন্টে নিয়ে যাবে
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return { submitBooking, loading };
};