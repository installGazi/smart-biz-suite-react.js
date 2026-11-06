import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/outline";

const BookingCard = ({ booking, onUpdate }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
      
      {/* বাম দিক: বুকিং ইনফো */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-slate-900">{booking.user?.name}</span>
          <span className="text-xs text-slate-500">({booking.user?.email})</span>
        </div>
        <div className="text-sm text-slate-700 font-medium mb-1">
          Plan: <span className="text-emerald-600">{booking.planName}</span> | Price: <span className="text-emerald-600">${booking.price}</span>
        </div>
        <p className="text-xs text-slate-500 line-clamp-2 italic mb-2">"{booking.requirements}"</p>
        
        <div className="flex gap-2">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
            booking.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 
            booking.paymentStatus === 'Pending Verification' ? 'bg-orange-100 text-orange-700' : 
            'bg-red-100 text-red-700'
          }`}>
            Payment: {booking.paymentStatus}
          </span>
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
            booking.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 
            booking.status === 'In Progress' ? 'bg-purple-100 text-purple-700' : 
            'bg-slate-100 text-slate-700'
          }`}>
            Status: {booking.status}
          </span>
        </div>
      </div>

      {/* ডান দিক: পেমেন্ট আইডি ও অ্যাকশন */}
      <div className="flex flex-col items-end gap-2 w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
        <div className="text-xs font-mono bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 w-full md:w-auto text-center">
          TrxID: <span className="font-bold text-slate-800">{booking.transactionId || "N/A"}</span>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          {/* পেমেন্ট অ্যাপ্রুভ বাটন */}
          {booking.paymentStatus !== "Paid" && (
            <button 
              onClick={() => onUpdate(booking._id, "In Progress", "Paid")}
              className="flex-1 md:flex-none px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg hover:bg-emerald-600 hover:text-white transition"
            >
              Mark Paid
            </button>
          )}
          
          {/* কাজ শেষ বাটন */}
          {booking.paymentStatus === "Paid" && booking.status !== "Completed" && (
            <button 
              onClick={() => onUpdate(booking._id, "Completed", "Paid")}
              className="flex-1 md:flex-none px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;