import { useForm } from "react-hook-form";
import { KeyIcon, LockClosedIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const FormReset = ({ onSubmit, onBack, loading, email }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <p className="text-sm text-slate-500 mb-4">
        Enter the OTP sent to <strong className="text-slate-800">{email}</strong>
      </p>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">OTP Code</label>
        <div className="relative group">
          <KeyIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-emerald-600 transition-colors" />
          <input 
            type="text" 
            placeholder="6-digit OTP" maxLength="6"
            {...register("otp", { required: "OTP is required" })}
            className={`w-full pl-12 pr-4 py-3.5 bg-slate-100/50 border ${errors.otp ? 'border-red-400' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none tracking-widest`} 
          />
        </div>
        {errors.otp && <p className="text-red-500 text-xs mt-1.5">{errors.otp.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
        <div className="relative group">
          <LockClosedIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-emerald-600 transition-colors" />
          <input 
            type="password" 
            placeholder="••••••••"
            {...register("password", { 
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" }
            })}
            className={`w-full pl-12 pr-4 py-3.5 bg-slate-100/50 border ${errors.password ? 'border-red-400' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none`} 
          />
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-4 mt-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {loading ? "Resetting..." : "Reset Password"}
        {!loading && <ArrowRightIcon className="w-5 h-5" />}
      </button>

      <button 
        type="button" onClick={onBack} disabled={loading}
        className="w-full py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition flex items-center justify-center gap-2"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Back to Email
      </button>
    </form>
  );
};

export default FormReset;