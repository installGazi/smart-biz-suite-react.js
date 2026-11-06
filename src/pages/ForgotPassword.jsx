import { Link } from "react-router-dom";
import { CheckBadgeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useForgot } from "../features/forgotPassword/hooks/useForgot";
import FormReq from "../features/forgotPassword/components/FormReq";
import FormReset from "../features/forgotPassword/components/FormReset";
import Success from "../features/forgotPassword/components/Success";

const ForgotPassword = () => {
  const { step, setStep, email, requestOTP, resetPassword, loading } = useForgot();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      
      {/* LEFT SIDE: FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10 order-1 lg:order-none">
        <div className="w-full max-w-md">
          
          <div className="text-center lg:text-left mb-10">
            {/* নেভবারের লোগো */}
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
                  <path d="M 26 14 C 25 13, 22 12, 19 12 C 14 12, 11 15, 11 20 C 11 25, 14 28, 19 28 C 23 28, 26 26, 26 23 L 26 20 L 20 20" stroke="white" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>install_<span className="text-emerald-600">Gazi</span></span>
            </Link>
            
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {step === 1 ? "Forgot Password?" : step === 2 ? "Reset Password" : "All Done!"}
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              {step === 1 
                ? "No worries, we'll send you reset instructions." 
                : step === 2 
                ? "Enter the OTP and your new password." 
                : "Your account is secure again."}
            </p>
          </div>

          {/* ডাইনামিক ফর্ম রেন্ডারিং */}
          {step === 1 && <FormReq onSubmit={requestOTP} loading={loading} />}
          {step === 2 && <FormReset onSubmit={resetPassword} onBack={() => setStep(1)} loading={loading} email={email} />}
          {step === 3 && <Success />}

          {step !== 3 && (
            <p className="text-center text-sm text-slate-600 mt-8">
              Remember your password? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Sign in</Link>
            </p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: GRAPHICS */}
      <div className="w-full lg:w-1/2 bg-slate-900 relative overflow-hidden flex items-center justify-center p-8 lg:p-12 min-h-[400px] lg:min-h-screen order-2 lg:order-none">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[30rem] h-[30rem] bg-emerald-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[30rem] h-[30rem] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        
        <div className="relative z-10 max-w-lg w-full">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Account Recovery</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Don't worry, it happens to the best of us. We use bank-level encryption and secure OTP verification to keep your account safe.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <LockClosedIcon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Secure OTP</h4>
                  <p className="text-slate-500 text-xs">6-digit encrypted code</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <CheckBadgeIcon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Instant Access</h4>
                  <p className="text-slate-500 text-xs">Get back to work in seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ForgotPassword;