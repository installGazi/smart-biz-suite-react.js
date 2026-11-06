import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useVerifyPassword } from "../hooks/useVerifyPassword";
import { UserIcon, EnvelopeIcon, LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const ProfileForm = ({ userData, setUserData }) => {
  const [activeTab, setActiveTab] = useState("general"); // 'general' or 'password'
  const { updateProfile, loading: updateLoading } = useUpdateProfile(setUserData);
  const { verifyPassword, loading: verifyLoading } = useVerifyPassword();

  const generalForm = useForm({
    defaultValues: { name: userData?.name || "", email: userData?.email || "" }
  });

  const passwordForm = useForm();

  // জেনারেল ইনফো সেভ
  const handleGeneralSubmit = (data) => {
    updateProfile(data);
  };

  // পাসওয়ার্ড চেঞ্জ সাবমিট
  const handlePasswordSubmit = async (data) => {
    // ১. আগে বর্তমান পাসওয়ার্ড চেক
    const isVerified = await verifyPassword(data.currentPassword);
    
    if (isVerified) {
      if (data.newPassword !== data.confirmPassword) {
        return passwordForm.setError("confirmPassword", { message: "Passwords do not match" });
      }
      // ২. নতুন পাসওয়ার্ড আপডেট (আপনার update.js অনুযায়ী password এবং newPassword লাগে)
      updateProfile({
        password: data.currentPassword,
        newPassword: data.newPassword
      });
      passwordForm.reset(); // ফর্ম ক্লিয়ার
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8">
        <button 
          onClick={() => setActiveTab("general")}
          className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'general' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          General Info
        </button>
        <button 
          onClick={() => setActiveTab("password")}
          className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'password' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Security
        </button>
      </div>

      {/* General Form */}
      {activeTab === "general" && (
        <form onSubmit={generalForm.handleSubmit(handleGeneralSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
            <div className="relative group">
              <UserIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-emerald-600 transition-colors" />
              <input 
                type="text" 
                {...generalForm.register("name", { required: "Name is required" })}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <div className="relative group">
              <EnvelopeIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-emerald-600 transition-colors" />
              <input 
                type="email" 
                {...generalForm.register("email", { required: "Email is required" })}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
              />
            </div>
          </div>

          <button 
            type="submit" disabled={updateLoading}
            className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition disabled:opacity-70"
          >
            {updateLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}

      {/* Password Form */}
      {activeTab === "password" && (
        <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Current Password</label>
            <div className="relative group">
              <LockClosedIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-emerald-600 transition-colors" />
              <input 
                type="password" 
                {...passwordForm.register("currentPassword", { required: "Current password is required" })}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
            <div className="relative group">
              <LockClosedIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-emerald-600 transition-colors" />
              <input 
                type="password" 
                {...passwordForm.register("newPassword", { required: "New password is required", minLength: { value: 6, message: "Min 6 characters" } })}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password</label>
            <div className="relative group">
              <LockClosedIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-emerald-600 transition-colors" />
              <input 
                type="password" 
                {...passwordForm.register("confirmPassword", { required: "Please confirm your password" })}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
              />
            </div>
          </div>

          <button 
            type="submit" disabled={updateLoading || verifyLoading}
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition disabled:opacity-70"
          >
            {(updateLoading || verifyLoading) ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileForm;