import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { LoginController } from "../controllers/Auth.js";
import { toast } from "react-toastify";
import { ForgotPassword } from "../components/ForgetPassword.jsx";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await LoginController(formData);
      Cookies.set("JwtToken",res.JwtToken);
      toast.success(res.message);
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="card w-full max-w-md bg-white shadow-lg">
        <div className="card-body">
          <div className="text-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full inline-block">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-1">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-6">
            Login to continue learning
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
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
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-500 mt-3">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-1/2 bg-white rounded-2xl shadow-lg p-6 sm:p-8">

            {/* Close Button */}
            <button
              onClick={() => setShowForgotPassword(false)}
              className="absolute top-50 right-34 text-gray-400 hover:text-gray-700 hover:scale-110 transition-all duration-150"
              aria-label="Close"
            >
              ✕
            </button>

            {/* ForgotPassword Component */}
            <div className="w-full">
              <ForgotPassword />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
