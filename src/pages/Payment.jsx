import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";
import { CreditCardIcon, CheckBadgeIcon, ShieldCheckIcon, BanknotesIcon } from "@heroicons/react/24/outline";

const Payment = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // আপনার আসল ব্যাংকের ডিটেইলস এখানে বসানো হলো
  const paymentDetails = {
    accountName: "GAZI SAIFUL ALAM",
    accountNumber: "1079005016916",
    bankName: "National Bank Limited",
    branchName: "Sreenagar Branch",
    swiftCode: "NBLTBDDH",
  };

  useEffect(() => {
    const fetchLatestBooking = async () => {
      try {
        // ইউজারের সর্বশেষ বুকিংটা আনা হচ্ছে
        const res = await api.get("/bookings/my-bookings");
        if (res.data.length > 0) {
          setBooking(res.data[0]); // সর্বশেষ বুকিং
        } else {
          toast.error("No booking found! Please book a plan first.");
          navigate("/booking");
        }
      } catch (error) {
        toast.error("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };
    fetchLatestBooking();
  }, [navigate]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!transactionId.trim()) return toast.error("Please enter the Transaction/Reference ID");

    setSubmitting(true);
    try {
      await api.put(`/bookings/${booking._id}/pay`, { transactionId });
      toast.success("Payment submitted! Waiting for admin verification.");
      navigate("/profile"); // সফল হলে প্রোফাইলে চলে যাবে
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCardIcon className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Complete Your Payment</h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            You have selected the <strong>{booking.planName}</strong> plan. Please send exactly <strong>${booking.price}</strong> to the bank details below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* বাম দিক: পেমেন্ট ডিটেইলস (ব্যাংক) */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BanknotesIcon className="w-6 h-6 text-emerald-600" /> Bank Details
              </h2>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Account Name</p>
                  <p className="text-lg font-extrabold text-slate-900">{paymentDetails.accountName}</p>
                </div>
                
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Account Number</p>
                  <p className="text-xl font-extrabold text-emerald-600 tracking-wider font-mono">{paymentDetails.accountNumber}</p>
                </div>
                
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Bank Name</p>
                  <p className="text-lg font-bold text-slate-900">{paymentDetails.bankName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Branch</p>
                    <p className="text-sm font-bold text-slate-900">{paymentDetails.branchName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">SWIFT Code</p>
                    <p className="text-sm font-bold text-slate-900 font-mono">{paymentDetails.swiftCode}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-red-500 font-semibold mt-6 bg-red-50 p-3 rounded-lg border border-red-100">
              * Please send the exact amount. Otherwise, your payment will not be verified.
            </p>
          </div>

          {/* ডান দিক: ট্রানজেকশন আইডি ফর্ম */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CheckBadgeIcon className="w-6 h-6 text-emerald-600" /> Verify Payment
              </h2>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                After transferring the money via Bank, enter your Transaction Reference Number or Receipt ID below. We will verify it within 1-2 hours.
              </p>

              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Transaction/Reference ID</label>
                  <input
                    type="text"
                    placeholder="e.g. NBL123456789"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none uppercase font-mono tracking-wider"
                  />
                </div>
                
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-xs font-medium flex justify-between items-center">
                  <span>Amount to pay:</span>
                  <span className="font-bold text-emerald-700 text-lg">${booking.price}</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/30 disabled:opacity-50 mt-4"
                >
                  {submitting ? "Submitting..." : "Confirm Payment"}
                </button>
              </form>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default Payment;