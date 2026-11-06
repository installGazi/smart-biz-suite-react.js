import { useForm } from "react-hook-form";
import { EnvelopeIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const FormReq = ({ onSubmit, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
        <div className="relative group">
          <EnvelopeIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-emerald-600 transition-colors" />
          <input 
            type="email" 
            placeholder="you@example.com"
            {...register("email", { 
              required: "Email is required",
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" }
            })}
            className={`w-full pl-12 pr-4 py-3.5 bg-slate-100/50 border ${errors.email ? 'border-red-400' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all`} 
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-4 mt-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {loading ? "Sending..." : "Send OTP"}
        {!loading && <ArrowRightIcon className="w-5 h-5" />}
      </button>
    </form>
  );
};

export default FormReq;