import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../../utils/api";

export const useBookings = (isAdmin) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const res = await api.get("/bookings/all");
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const updateBooking = async (id, status, paymentStatus) => {
    try {
      const res = await api.put(`/bookings/${id}/status`, { status, paymentStatus });
      setBookings(prev => prev.map(b => b._id === id ? res.data : b));
      toast.success("Booking updated successfully!");
    } catch (error) {
      toast.error("Failed to update booking");
    }
  };

  return { bookings, loading, updateBooking, fetchBookings };
};