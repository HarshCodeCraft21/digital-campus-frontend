import { useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  LogOut,
  Play,
  MessageSquare,
  BookOpen,
} from "lucide-react";

const Profile = () => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("JwtToken");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-8 px-4">
      {/* Cover Section */}
      <div className="relative w-full max-w-6xl rounded-2xl shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80"
          alt="Cover"
          className="w-full h-48 sm:h-64 md:h-72 object-cover"
        />

        {/* Avatar */}
        <div className="absolute left-1/2 -bottom-16 -translate-x-1/2 sm:left-12 sm:translate-x-0">
          <div className="avatar">
            <div className="w-28 sm:w-32 md:w-36 rounded-full ring-4 ring-blue-500 ring-offset-1 bg-base-100 shadow-lg">
              <img
                src="https://api.dicebear.com/9.x/adventurer/svg?seed=John"
                alt="Profile Avatar"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="w-full max-w-6xl bg-base-100 rounded-2xl shadow-lg mt-20 p-6 sm:p-8">
        {/* Header Info */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold">Harsh Jain</h2>
            <p className="text-gray-500 text-base sm:text-lg">Student</p>
          </div>

          <button
            className="btn bg-red-400 hover:bg-red-500 text-white rounded-full w-full sm:w-auto flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>

        {/* Logout Modal */}
        {open && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirm Logout</h3>
              <p className="py-4">Are you sure you want to logout?</p>
              <div className="modal-action">
                <button className="btn" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-error text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            <div
              className="modal-backdrop"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
          </div>
        )}

        <div className="divider" />

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Contact Info */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center gap-3 text-gray-600">
              <Phone className="text-primary w-5 h-5" />
              <span>+91 7737694558</span>
            </div>

            <div className="flex justify-center md:justify-start items-center gap-3 text-gray-600">
              <Mail className="text-primary w-5 h-5" />
              <span>harshj@123.com</span>
            </div>

            <button className="btn btn-accent w-full rounded-full mt-4 text-white flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" /> Update Profile
            </button>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center mt-4">
              <span className="text-gray-500 text-sm">
                Enrolled Students (1200)
              </span>
            </div>
          </div>

          {/* Video Card */}
          <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
            <figure className="relative">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80"
                alt="Video"
                className="w-full h-40 sm:h-48 object-cover"
              />
              <button
                className="btn btn-circle btn-primary absolute inset-0 m-auto opacity-90 hover:opacity-100"
                aria-label="Play Video"
              >
                <Play className="w-5 h-5" />
              </button>
            </figure>
            <div className="card-body text-center sm:text-left">
              <h3 className="font-bold text-lg">Introduction</h3>
              <p className="text-sm text-gray-500">
                Watch a short introduction video about Kevin Smith.
              </p>
            </div>
          </div>

          {/* Course Card */}
          <div className="card bg-sky-100 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="card-body text-center sm:text-left">
              <h3 className="font-bold text-lg">Registered Courses</h3>
              <p className="text-sm text-gray-600 mb-4">All Courses</p>
              <Link to="/courses" onClick={() => window.scrollTo(0, 0)}>
                <button className="btn btn-outline btn-primary rounded-full w-full flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4" /> Courses →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
