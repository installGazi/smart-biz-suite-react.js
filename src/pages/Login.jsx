import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  ArrowRightIcon,
  CheckBadgeIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import { useLogin } from "../features/login/hooks/useLogin";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser, loading } = useLogin();

  const onSubmit = (data) => {
    loginUser({
      email: data.email,
      password: data.password
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      
      {/* LEFT SIDE: FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10 order-1 lg:order-none">
        <div className="w-full max-w-md">
          
          <div className="text-center lg:text-left mb-10">
            
            {/* নেভবারের হুবহু G লোগো এবং install_Gazi */}
            <Link to="/" className="inline-flex items-center gap-2.5 text-2xl font-bold text-slate-900 mb-6 group">
              <span className="relative">
                <svg viewBox="0 0 40 40" className="w-10 h-10 transition-transform duration-300 group-hover:rotate-[8deg]" aria-hidden="true">
                  <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <rect width="40" height="40" rx="12" fill="url(#logoGrad)" />
                  <path
                    d="M 26 14 
                       C 25 13, 22 12, 19 12 
                       C 14 12, 11 15, 11 20 
                       C 11 25, 14 28, 19 28 
                       C 23 28, 26 26, 26 23 
                       L 26 20 
                       L 20 20"
                    stroke="white"
                    strokeWidth="2.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                install_<span className="text-emerald-600">Gazi</span>
              </span>
            </Link>
            
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 mt-2 text-sm">Sign in to access your dashboard and manage projects.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative group">
                <EnvelopeIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-emerald-600 transition-colors" />
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-100/50 border ${errors.email ? 'border-red-400' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all`} 
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <Link to="/forgotpassword" className="text-sm font-bold text-emerald-600 hover:underline transition-all">Forgot?</Link>
              </div>
              <div className="relative group">
                <LockClosedIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-emerald-600 transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-100/50 border ${errors.password ? 'border-red-400' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all`} 
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 mt-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:shadow-none"
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRightIcon className="w-5 h-5" />}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-8">
            Don't have an account? <Link to="/register" className="text-emerald-600 font-bold hover:underline">Create one</Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: GRAPHICS (মোবাইলেও দেখা যাবে) */}
      <div className="w-full lg:w-1/2 bg-slate-900 relative overflow-hidden flex items-center justify-center p-8 lg:p-12 min-h-[400px] lg:min-h-screen order-2 lg:order-none">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[30rem] h-[30rem] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[30rem] h-[30rem] bg-emerald-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        
        <div className="relative z-10 max-w-lg w-full">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Secure Access</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Log in to chat with clients, manage your projects, and access your personalized dashboard instantly.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <ShieldCheckIcon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Highly Secure</h4>
                  <p className="text-slate-500 text-xs">JWT encrypted authentication</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckBadgeIcon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Trusted Platform</h4>
                  <p className="text-slate-500 text-xs">Seamless user experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;