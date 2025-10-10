import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Loader2 } from "lucide-react";
import { LoginController } from "../controllers/Auth.js";
import { toast } from "react-toastify";
import { ForgotPassword } from "../components/ForgetPassword.jsx";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext.js";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated, setUserValue } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await LoginController(formData);
      localStorage.setItem("JwtToken", res.JwtToken);
      setIsAuthenticated(true);
      setUserValue(res.userData);
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full inline-block">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-base-content mt-3">
              Welcome Back
            </h2>
            <p className="text-base-content/60">Login to continue learning</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
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
              <label className="label flex justify-between">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
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
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-l text-primary hover:underline text-right w-full"
            >
              Forgot password?
            </button>
            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>

            {/* Signup Link */}
            <p className="text-center text-sm text-base-content/60 mt-3">
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

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="modal modal-open">
          <div className="modal-box relative max-w-md">
            <button
              onClick={() => setShowForgotPassword(false)}
              className="btn btn-sm btn-circle absolute right-3 top-3"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg mb-3 text-base-content">
              Reset Password
            </h3>
            <ForgotPassword />
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowForgotPassword(false)}
          ></div>
        </div>
      )}
    </div>
  );
}
