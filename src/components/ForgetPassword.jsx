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
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6 sm:p-8 transition-all">
        {/* Step 1: Email */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2 text-base-content">
              <Mail className="text-primary w-6 h-6" /> Forgot Password
            </h2>
            <p className="text-base-content/60 mb-6">
              Enter your email to receive a verification code.
            </p>

            <input
              type="email"
              placeholder="Enter your registered email"
              className="input input-bordered w-full mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleEmailSubmit}
              disabled={!email || loading}
              className={`btn btn-primary w-full ${
                !email || loading ? "btn-disabled" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Sending...
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
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2 text-base-content">
              <KeyRound className="text-primary w-6 h-6" /> Verify OTP
            </h2>
            <p className="text-base-content/60 mb-6">
              Enter the 6-digit code sent to your email.
            </p>

            <input
              type="text"
              placeholder="Enter OTP"
              maxLength="6"
              className="input input-bordered w-full mb-4 text-center tracking-widest text-lg"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={prevStep}
                disabled={loading}
                className="btn w-full sm:w-1/2 btn-ghost"
              >
                Back
              </button>
              <button
                onClick={handleOtpSubmit}
                disabled={otp.length !== 6 || loading}
                className={`btn w-full sm:w-1/2 btn-primary ${
                  otp.length !== 6 || loading ? "btn-disabled" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
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
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2 text-base-content">
              <Lock className="text-primary w-6 h-6" /> Reset Password
            </h2>
            <p className="text-base-content/60 mb-6">
              Create a new, strong password.
            </p>

            <input
              type="password"
              placeholder="Enter new password"
              className="input input-bordered w-full mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={prevStep}
                disabled={loading}
                className="btn w-full sm:w-1/2 btn-ghost"
              >
                Back
              </button>
              <button
                onClick={handlePasswordChange}
                disabled={password.length < 8 || loading}
                className={`btn w-full sm:w-1/2 btn-primary ${
                  password.length < 8 || loading ? "btn-disabled" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Resetting...
                  </>
                ) : (
                  "Reset"
                )}
              </button>
            </div>

            {password && password.length < 8 && (
              <p className="text-xs text-red-500 mt-2">
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
                step === i ? "bg-primary" : "bg-base-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
