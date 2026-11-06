import { useState } from "react";
import { ShieldCheckIcon, CpuChipIcon, CommandLineIcon, ServerIcon, UserGroupIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { useAdmin } from "../features/adminPanel/hooks/useAdmin";
import { useBookings } from "../features/adminPanel/hooks/useBookings";
import UserCard from "../features/adminPanel/components/UserCard";
import BookingCard from "../features/adminPanel/components/BookingCard";

const AdminPanel = () => {
  const { users, loading: usersLoading, isAdmin, handleAction } = useAdmin();
  const { bookings, loading: bookingsLoading, updateBooking } = useBookings(isAdmin);
  
  const [activeTab, setActiveTab] = useState("users"); // 'users' অথবা 'bookings'

  if (usersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      
      {/* ক্লায়েন্টের জন্য ফ্লেক্স (আগের মতোই) */}
      {!isAdmin && (
        <div className="bg-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* ... (ক্লায়েন্টের লাল লেখা এবং টেকনিক্যাল কার্ডগুলো এখানে থাকবে, আমি কোড কম্প্যাক্ট রাখার জন্য বাদ দিলাম না, পুরোটা দিচ্ছি) ... */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-4 mb-10 text-center animate-pulse">
              <p className="text-red-400 font-bold text-sm md:text-base tracking-widest uppercase">
                This page is only made for the founder Gazi Saiful. When you buy a website from him, you will also have an admin panel like this.
              </p>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <CpuChipIcon className="w-8 h-8 text-emerald-500" />
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                System Architecture & Neural Core
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <ServerIcon className="w-5 h-5 text-blue-400" />
                  <h3 className="text-white font-bold">Quantum Decryption</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  &gt; Initializing asynchronous thread pool...<br/>
                  &gt; Zero-Knowledge Architectural Proof: <span className="text-emerald-400">VERIFIED</span><br/>
                  &gt; Distributed Ledger Database Indexing: <span className="text-emerald-400">SYNCED</span>
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <CommandLineIcon className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-white font-bold">Microservice Gateway</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  &gt; API Gateway Rate Limiting: <span className="text-emerald-400">ACTIVE</span><br/>
                  &gt; Elastic Search Synchronization: <span className="text-emerald-400">100%</span><br/>
                  &gt; Neural Network Data Syncing: <span className="text-blue-400">RUNNING</span>
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheckIcon className="w-5 h-5 text-purple-400" />
                  <h3 className="text-white font-bold">Security Matrix</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  &gt; End-to-End Encryption: <span className="text-emerald-400">ON</span><br/>
                  &gt; DDoS Threat Mitigation: <span className="text-emerald-400">SHIELDED</span><br/>
                  &gt; Core Admin Access: <span className="text-red-400">ROOT PRIVILEGE</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* অ্যাডমিনের মূল ড্যাশবোর্ড */}
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${isAdmin ? 'pt-28' : 'mt-8'} relative z-20`}>
        
        {isAdmin ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                Welcome back, Founder <span className="text-2xl">👑</span>
              </h1>
              <p className="text-slate-500 mt-1">Here is the real-time status of your platform.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200">
              
              {/* ট্যাব বাটন */}
              <div className="flex border-b border-slate-200 mb-6">
                <button 
                  onClick={() => setActiveTab("users")}
                  className={`flex items-center gap-2 pb-3 px-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'users' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  <UserGroupIcon className="w-5 h-5" /> User Management ({users.length})
                </button>
                <button 
                  onClick={() => setActiveTab("bookings")}
                  className={`flex items-center gap-2 pb-3 px-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'bookings' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  <DocumentTextIcon className="w-5 h-5" /> Bookings & Payments ({bookings.length})
                </button>
              </div>

              {/* ট্যাব কনটেন্ট */}
              <div className="space-y-4">
                {activeTab === "users" ? (
                  users.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                      <p className="text-slate-500 font-medium">No users found in the database.</p>
                    </div>
                  ) : (
                    users.map((user) => (
                      <UserCard key={user._id} user={user} onAction={handleAction} />
                    ))
                  )
                ) : (
                  bookingsLoading ? (
                    <div className="text-center py-8 text-slate-500">Loading bookings...</div>
                  ) : bookings.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                      <p className="text-slate-500 font-medium">No bookings found yet.</p>
                    </div>
                  ) : (
                    bookings.map((booking) => (
                      <BookingCard key={booking._id} booking={booking} onUpdate={updateBooking} />
                    ))
                  )
                )}
              </div>

            </div>
          </>
        ) : (
          /* ক্লায়েন্টের জন্য Access Restricted */
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-slate-200 text-center mt-8">
             <ShieldCheckIcon className="w-20 h-20 text-slate-300 mx-auto mb-6" />
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Access Restricted</h2>
             <p className="text-slate-500 max-w-md mx-auto text-lg mb-8">
               You are viewing the demo mode. Only the root administrator (Gazi Saiful) has the privilege to view and manage the user database. 
             </p>
             <button onClick={() => window.location.href = "/"} className="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition">
                Return to Home
             </button>
          </div>
        )}

      </div>

    </div>
  );
};

export default AdminPanel;