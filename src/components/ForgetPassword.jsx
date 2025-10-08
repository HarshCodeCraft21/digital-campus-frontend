import { useState } from "react";
import { Mail, Lock, KeyRound, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

export const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleEmailSubmit = () => {
    toast.success("OTP sent to your email!");
    nextStep();
  };

  const handleOtpSubmit = () => {
    toast.success("OTP verified!");
    nextStep();
  };

  const handlePasswordChange = () => {
    toast.success("Password changed successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f9fc] px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 transition-all">
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2">
              <Mail className="text-indigo-600" /> Forgot Password
            </h2>
            <p className="text-gray-500 mb-6">
              Enter your email to receive a verification code.
            </p>

            <input
              type="email"
              placeholder="Enter your registered email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleEmailSubmit}
              disabled={!email}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-white transition-colors ${
                email
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "bg-indigo-300 cursor-not-allowed"
              }`}
            >
              Send Code <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2">
              <KeyRound className="text-indigo-600" /> Verify OTP
            </h2>
            <p className="text-gray-500 mb-6">
              Enter the 6-digit code sent to your email.
            </p>

            <input
              type="text"
              placeholder="Enter OTP"
              maxLength="6"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4 text-center tracking-widest"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={prevStep}
                className="w-1/2 py-3 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleOtpSubmit}
                disabled={otp.length !== 6}
                className={`w-1/2 py-3 rounded-lg font-semibold text-white transition-colors ${
                  otp.length === 6
                    ? "bg-indigo-500 hover:bg-indigo-600"
                    : "bg-indigo-300 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2">
              <Lock className="text-indigo-600" /> Reset Password
            </h2>
            <p className="text-gray-500 mb-6">
              Create a new, strong password.
            </p>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={prevStep}
                className="w-1/2 py-3 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handlePasswordChange}
                disabled={password.length < 8}
                className={`w-1/2 py-3 rounded-lg font-semibold text-white transition-colors ${
                  password.length >= 8
                    ? "bg-indigo-500 hover:bg-indigo-600"
                    : "bg-indigo-300 cursor-not-allowed"
                }`}
              >
                Reset
              </button>
            </div>

            {password && password.length < 8 && (
              <p className="text-sm text-red-500 mt-2">
                Password must be at least 8 characters.
              </p>
            )}
          </div>
        )}
        
        <div className="flex justify-center mt-8 space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                step === i ? "bg-indigo-600" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
