import { Link } from "react-router-dom";
import { CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const Success = () => {
  return (
    <div className="text-center py-6">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircleIcon className="w-10 h-10 text-emerald-600" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Password Reset!</h3>
      <p className="text-slate-500 mb-8">Your password has been successfully changed. You can now log in with your new password.</p>
      
      <Link 
        to="/login"
        className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
      >
        Go to Login <ArrowRightIcon className="w-5 h-5" />
      </Link>
    </div>
  );
};

export default Success;