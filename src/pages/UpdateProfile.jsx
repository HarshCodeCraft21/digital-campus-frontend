import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Upload, Loader2 } from "lucide-react";
import { Register } from "../controllers/Auth.js";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext.js";

export default function UpdateProfile() {
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const { setUserValue, setIsAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

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
      //code
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full inline-block">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-base-content mt-3">
              Update Profile
            </h2>
            <p className="text-base-content/60">
              One Campus Infinite Learning
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-3">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile Preview" />
                  ) : (
                    <div className="flex items-center justify-center bg-base-300 w-full h-full text-base-content/40">
                      <Upload className="h-8 w-8" />
                    </div>
                  )}
                </div>
              </div>
              <label
                htmlFor="image"
                className="text-sm text-primary cursor-pointer hover:underline"
              >
                Upload Profile Picture
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={handleImageUpload}
              />
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Full Name *</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  className="input input-bordered w-full"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Email *</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="input input-bordered w-full"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Password *</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="input input-bordered w-full"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Age</span>
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="input input-bordered w-full"
                  placeholder="20"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Gender</span>
                </label>
                <select
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

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`btn btn-primary w-full font-bold ${loading ? "btn-disabled" : ""}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
