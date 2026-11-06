import { 
  TrashIcon, 
  NoSymbolIcon, 
  ExclamationTriangleIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

const UserCard = ({ user, onAction }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 hover:shadow-md transition-shadow">
      
      {/* User Info */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl border border-slate-200">
          {user.profilePic || user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            {user.name}
            {user.role === "admin" && <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />}
          </h3>
          <p className="text-sm text-slate-500">{user.email}</p>
          <div className="flex gap-2 mt-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${user.role === 'admin' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
              {user.role}
            </span>
            {user.isBlocked && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 uppercase tracking-wider">
                Blocked
              </span>
            )}
            {user.warnings > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 uppercase tracking-wider">
                {user.warnings} Warnings
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-4">
        
        {/* Warn Button */}
        <button 
          onClick={() => onAction(user._id, "warn")}
          className="p-2.5 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-600 hover:text-white transition-colors tooltip"
          title="Warn User"
        >
          <ExclamationTriangleIcon className="w-5 h-5" />
        </button>

        {/* Block/Unblock Button */}
        <button 
          onClick={() => onAction(user._id, user.isBlocked ? "unblock" : "block")}
          className={`p-2.5 rounded-xl transition-colors tooltip ${user.isBlocked ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white'}`}
          title={user.isBlocked ? "Unblock User" : "Block User"}
        >
          <NoSymbolIcon className="w-5 h-5" />
        </button>

        {/* Delete Button */}
        <button 
          onClick={() => onAction(user._id, "delete")}
          className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-colors tooltip"
          title="Delete User"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

export default UserCard;