import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { 
  UserIcon, EnvelopeIcon, LockClosedIcon, 
  ArrowRightIcon, CheckBadgeIcon, CodeBracketIcon
} from "@heroicons/react/24/outline";
import { useRegister } from "../features/register/hooks/useRegister";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, loading } = useRegister();

  const onSubmit = (data) => {
    registerUser({
      name: data.name,
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
            
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create an account</h2>
            <p className="text-slate-500 mt-2 text-sm">Join us to start building your dream projects today.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <div className="relative group">
                <UserIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-emerald-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Gazi Saiful"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-100/50 border ${errors.name ? 'border-red-400' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all`} 
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name.message}</p>}
            </div>

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
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative group">
                <LockClosedIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-emerald-600 transition-colors" />
                <input 
                  type="password" 
                  placeholder="Create a strong password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
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
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRightIcon className="w-5 h-5" />}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-8">
            Already have an account? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: GRAPHICS */}
      <div className="w-full lg:w-1/2 bg-slate-900 relative overflow-hidden flex items-center justify-center p-8 lg:p-12 min-h-[400px] lg:min-h-screen order-2 lg:order-none">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[30rem] h-[30rem] bg-emerald-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[30rem] h-[30rem] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        
        <div className="relative z-10 max-w-lg w-full">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Start Your Journey</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Join our platform to collaborate, build scalable applications, and take your business to the next level with modern MERN stack solutions.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckBadgeIcon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Premium Quality</h4>
                  <p className="text-slate-500 text-xs">Top-tier code architecture</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <CodeBracketIcon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Clean Development</h4>
                  <p className="text-slate-500 text-xs">Scalable and maintainable code</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;