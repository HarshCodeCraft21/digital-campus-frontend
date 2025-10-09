import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Loader2 } from "lucide-react"; // ⬅️ Added loader icon
import { LoginController } from "../controllers/Auth.js";
import { toast } from "react-toastify";
import { ForgotPassword } from "../components/ForgetPassword.jsx";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ⬅️ Added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ⬅️ Start loader
    try {
      const res = await LoginController(formData);
      Cookies.set("JwtToken", res.JwtToken);
      toast.success(res.message);
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
      console.error(error.message);
    } finally {
      setLoading(false); // ⬅️ Stop loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-sm sm:max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="bg-indigo-100 p-3 rounded-full inline-block">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Login to continue learning
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />

            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="block w-full text-right text-xs sm:text-sm text-indigo-600 hover:underline mt-2"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button with Loader */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-lg text-sm sm:text-base transition-colors
              ${loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-500 mt-3">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-3 sm:px-6">
          <div className="relative w-full max-w-xs sm:max-w-md bg-white rounded-2xl shadow-xl p-5 sm:p-8">
            <button
              onClick={() => setShowForgotPassword(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 hover:scale-110 transition-transform"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="overflow-hidden max-h-[85vh] sm:max-h-[90vh]">
              <ForgotPassword />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
