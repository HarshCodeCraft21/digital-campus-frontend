import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Upload, Loader2 } from "lucide-react"; // ⬅️ Added Loader2
import { Register } from "../controllers/Auth.js";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext.js";
import Cookies from "js-cookie";

export default function SignUp() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const { setUserValue } = useContext(UserContext);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Register(formData);
      Cookies.set("JwtToken", res.JwtToken);
      setUserValue(res.userData);
      toast.success(res.message);
      navigate("/");
      window.location.reload();
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 md:px-8 py-12">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="bg-indigo-100 p-3 rounded-full inline-block">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Join Digital Campus and start your learning journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-2 border-indigo-100">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Upload className="h-8 w-8" />
                  </div>
                )}
              </div>
            </div>
            <label
              htmlFor="image"
              className="cursor-pointer text-sm text-indigo-600 hover:underline"
            >
              Upload Profile Picture
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block mb-1 font-medium">
                Full Name *
              </label>
              <input
                id="name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block mb-1 font-medium">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block mb-1 font-medium">
                Password *
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="age" className="block mb-1 font-medium">
                Age
              </label>
              <input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="block mb-1 font-medium">
                Gender
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="select select-bordered w-full"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Submit Button with Loader */}
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
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center text-sm text-gray-500 mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
