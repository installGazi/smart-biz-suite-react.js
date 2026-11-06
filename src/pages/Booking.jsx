import BookingForm from "../features/booking/components/BookingForm";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Booking = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardDocumentCheckIcon className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Hire Me</h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Fill out the form below to start your project. Once submitted, you'll be redirected to the payment page.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">
          <BookingForm />
        </div>
        
        <p className="text-center text-sm text-slate-500 mt-8">
          Have a custom requirement? <Link to="/chat" className="text-emerald-600 font-bold hover:underline">Chat with me directly</Link>
        </p>

      </div>
    </div>
  );
};

export default Booking;