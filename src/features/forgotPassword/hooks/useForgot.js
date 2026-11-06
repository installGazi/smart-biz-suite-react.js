import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../utils/api";

export const useForgot = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP+Password, 3: Success
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: OTP রিকোয়েস্ট
  const requestOTP = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post("/users/forgot-password", { email: formData.email });
      setEmail(formData.email);
      toast.success("OTP sent to your email!");
      // ডেভেলপমেন্টের সুবিধার জন্য কনসোল/টোস্টে OTP দেখাবে
      if (res.data?.otp) {
        toast.info(`Dev OTP: ${res.data.otp}`, { autoClose: 10000 });
      }
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: পাসওয়ার্ড রিসেট
  const resetPassword = async (formData) => {
    setLoading(true);
    try {
      await api.post("/users/reset-password", { 
        otp: formData.otp, 
        password: formData.password 
      });
      toast.success("Password reset successfully!");
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return { step, setStep, email, requestOTP, resetPassword, loading };
};