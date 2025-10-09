import { useState } from "react";
import { Mail, Lock, KeyRound, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  ForgetPasswordController,
  resetPasswordController,
  verifyOTPController,
} from "../controllers/forgetPassword.js";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleEmailSubmit = async () => {
    try {
      setLoading(true);
      const res = await ForgetPasswordController(email);
      toast.success(res.message);
      nextStep();
    } catch (err) {
      toast.error(err.message || "Failed to send verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      setLoading(true);
      const res = await verifyOTPController(email, otp);
      toast.success("OTP verified!");
      nextStep();
    } catch (err) {
      toast.error(err.message || "Invalid OTP!");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    try {
      setLoading(true);
      const res = await resetPasswordController(email, password);
      toast.success(res.message);
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f9fc] px-4 sm:px-6 md:px-8">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6 sm:p-8 transition-all">
        {/* Step 1: Email */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2">
              <Mail className="text-indigo-600 w-6 h-6 sm:w-7 sm:h-7" /> Forgot Password
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mb-6">
              Enter your email to receive a verification code.
            </p>

            <input
              type="email"
              placeholder="Enter your registered email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4 text-sm sm:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleEmailSubmit}
              disabled={!email || loading}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-white transition-colors text-sm sm:text-base ${
                email && !loading
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "bg-indigo-300 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Code <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2">
              <KeyRound className="text-indigo-600 w-6 h-6 sm:w-7 sm:h-7" /> Verify OTP
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mb-6">
              Enter the 6-digit code sent to your email.
            </p>

            <input
              type="text"
              placeholder="Enter OTP"
              maxLength="6"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4 text-center tracking-widest text-lg sm:text-xl"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={prevStep}
                disabled={loading}
                className="w-full sm:w-1/2 py-3 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 transition-colors text-sm sm:text-base disabled:opacity-70"
              >
                Back
              </button>
              <button
                onClick={handleOtpSubmit}
                disabled={otp.length !== 6 || loading}
                className={`flex items-center justify-center gap-2 w-full sm:w-1/2 py-3 rounded-lg font-semibold text-white transition-colors text-sm sm:text-base ${
                  otp.length === 6 && !loading
                    ? "bg-indigo-500 hover:bg-indigo-600"
                    : "bg-indigo-300 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                  </>
                ) : (
                  "Next"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2">
              <Lock className="text-indigo-600 w-6 h-6 sm:w-7 sm:h-7" /> Reset Password
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mb-6">
              Create a new, strong password.
            </p>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4 text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={prevStep}
                disabled={loading}
                className="w-full sm:w-1/2 py-3 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 transition-colors text-sm sm:text-base disabled:opacity-70"
              >
                Back
              </button>
              <button
                onClick={handlePasswordChange}
                disabled={password.length < 8 || loading}
                className={`flex items-center justify-center gap-2 w-full sm:w-1/2 py-3 rounded-lg font-semibold text-white transition-colors text-sm sm:text-base ${
                  password.length >= 6 && !loading
                    ? "bg-indigo-500 hover:bg-indigo-600"
                    : "bg-indigo-300 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Resetting...
                  </>
                ) : (
                  "Reset"
                )}
              </button>
            </div>

            {password && password.length < 8 && (
              <p className="text-xs sm:text-sm text-red-500 mt-2">
                Password must be at least 8 characters.
              </p>
            )}
          </div>
        )}

        {/* Progress Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${
                step === i ? "bg-indigo-600" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
