import { useState } from "react";
import { useForm } from "react-hook-form";
import { useBooking } from "../hooks/useBooking";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const plans = [
  { name: "Basic", price: 50 },
  { name: "Standard", price: 100 },
  { name: "Premium", price: 250 },
];

const BookingForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { submitBooking, loading } = useBooking();
  
  // ডিফল্টভাবে Standard প্ল্যান সিলেক্ট থাকবে
  const [selectedPlan, setSelectedPlan] = useState(plans[1]); 
  const requirements = watch("requirements", "");

  const onSubmit = (data) => {
    submitBooking({
      planName: selectedPlan.name,
      price: selectedPlan.price,
      requirements: data.requirements,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      
      {/* প্ল্যান সিলেকশন */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">1. Select a Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan)}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedPlan.name === plan.name
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 bg-white hover:border-emerald-300"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-slate-900">{plan.name}</h4>
                {selectedPlan.name === plan.name && (
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                )}
              </div>
              <p className="text-2xl font-extrabold text-slate-900">${plan.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* রিকোয়ারমেন্টস */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">2. Project Requirements</h3>
        <div className="relative group">
          <textarea
            rows="5"
            placeholder="Describe your project, features, and any specific instructions..."
            {...register("requirements", { 
              required: "Please describe your requirements",
              minLength: { value: 20, message: "Please provide at least 20 characters" }
            })}
            className={`w-full px-4 py-3 bg-slate-50 border ${
              errors.requirements ? "border-red-400" : "border-slate-200"
            } rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition-all`}
          />
        </div>
        <div className="flex justify-between items-center mt-1">
          {errors.requirements ? (
            <p className="text-red-500 text-xs font-medium">{errors.requirements.message}</p>
          ) : (
            <span className="text-xs text-slate-400">Be as detailed as possible.</span>
          )}
          <span className="text-xs text-slate-400">{requirements.length} chars</span>
        </div>
      </div>

      {/* সাবমিট বাটন */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/30 disabled:opacity-50"
      >
        {loading ? "Submitting..." : `Confirm Booking ($${selectedPlan.price})`}
      </button>
    </form>
  );
};

export default BookingForm;