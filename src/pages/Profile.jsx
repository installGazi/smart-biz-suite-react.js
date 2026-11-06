import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRightOnRectangleIcon, 
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  PencilIcon
} from "@heroicons/react/24/outline";
import { useProfileData } from "../features/profile/hooks/useProfileData";
import { useUpdateProfile } from "../features/profile/hooks/useUpdateProfile";
import ProfileForm from "../features/profile/components/ProfileForm";
import { toast } from "react-toastify";

const Profile = () => {
  const { userData, setUserData, loading } = useProfileData();
  const { updateProfile } = useUpdateProfile(setUserData);
  const navigate = useNavigate();
  
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // কার্টুন অ্যানিমেলের লিস্ট (ইউজার এখান থেকে চুস করবে)
  const animalAvatars = ["🦊", "🐭", "🐶", "🐯", "🐍", "🦁", "🐼", "🐸", "🐵", "🦉"];

  // Logout Function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // অ্যাভাটার সিলেক্ট করলে যা হবে
  const handleSelectAvatar = (emoji) => {
    updateProfile({ ...userData, profilePic: emoji });
    setShowAvatarPicker(false);
    toast.success("Avatar updated!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* LEFT SIDE: USER CARD & LOGOUT */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center relative overflow-hidden">
              
              {/* Top Gradient */}
              <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-r from-emerald-500 to-blue-500"></div>
              
              {/* Avatar (Emoji) + Edit Button */}
              <div className="relative w-24 h-24 bg-slate-50 rounded-full mx-auto mt-8 flex items-center justify-center border-4 border-white shadow-lg text-5xl">
                {userData?.profilePic ? (
                  <span>{userData.profilePic}</span>
                ) : (
                  <span className="font-extrabold text-emerald-600 text-4xl">
                    {userData?.name?.charAt(0).toUpperCase()}
                  </span>
                )}
                
                {/* Edit Avatar Button (Pencil) */}
                <button 
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-md"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Avatar Picker Dropdown */}
              {showAvatarPicker && (
                <div className="absolute top-32 left-1/2 -translate-x-1/2 z-20 bg-white p-3 rounded-2xl shadow-2xl border border-slate-200 grid grid-cols-5 gap-2 w-64">
                  {animalAvatars.map((animal) => (
                    <button 
                      key={animal}
                      onClick={() => handleSelectAvatar(animal)}
                      className="w-10 h-10 text-2xl hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center"
                    >
                      {animal}
                    </button>
                  ))}
                </div>
              )}

              <h2 className="mt-4 text-2xl font-bold text-slate-900">{userData?.name}</h2>
              <p className="text-sm text-slate-500 mb-4">{userData?.email}</p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                {userData?.role}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => navigate("/chat")}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-50 text-emerald-700 font-bold rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  Go to Chat
                </button>

                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-100"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: EDIT PROFILE */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-full">
              <div className="flex items-center gap-3 mb-4">
                <Cog6ToothIcon className="w-8 h-8 text-slate-400" />
                <h2 className="text-2xl font-bold text-slate-900">Account Settings</h2>
              </div>
              <p className="text-slate-500 mb-8 text-sm">Manage your personal information and security settings.</p>

              {/* Form Component */}
              <ProfileForm userData={userData} setUserData={setUserData} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;