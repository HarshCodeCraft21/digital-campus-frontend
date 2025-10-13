import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Loader2,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext.js";
import { ProfileUpdate } from "../controllers/Auth.js";

export default function UpdateProfile() {
  const { userValue, setUserValue } = useContext(UserContext);
  const navigate = useNavigate();

  // ✅ Form State
  const [formData, setFormData] = useState({
    fullName: userValue?.fullName || "",
    email: userValue?.email || "",
    age: userValue?.age || "",
    gender: userValue?.gender || "",
  });

  // ✅ Image States
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(userValue?.profileUrl || "");
  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // ✅ Handle image upload
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be under 2MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  // ✅ Cleanup image URL on unmount
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        payload.append(key, value)
      );
      if (image) payload.append("profileUrl", image);

      const res = await ProfileUpdate(payload);
      if (!res) throw new Error("Profile update failed.");

      setUserValue(res);
      toast.success("Profile updated successfully!");
      navigate("/");
      window.scrollTo(0, 0);
      window.location.reload();
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/profile");
    window.scrollTo(0, 0);
  };

  return (
    <main className="min-h-screen bg-base-200 flex justify-center py-10 px-4 overflow-y-auto">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full inline-block">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mt-3 text-base-content">
              Update Profile
            </h2>
            <p className="text-base-content/60">
              One Campus, Infinite Learning
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-3">
              <div className="avatar">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center bg-base-300 w-full h-full text-base-content/40">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                  )}
                </div>
              </div>

              <label className="text-sm text-primary cursor-pointer hover:underline relative inline-block">
                Upload Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>

            {/* Input Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  label: "Full Name *",
                  name: "fullName",
                  type: "text",
                  placeholder: "John Doe",
                  required: true,
                },
                {
                  label: "Email *",
                  name: "email",
                  type: "email",
                  placeholder: "example@email.com",
                  required: true,
                },
                {
                  label: "Age",
                  name: "age",
                  type: "number",
                  placeholder: "20",
                },
              ].map(({ label, name, type, placeholder, required }) => (
                <div key={name}>
                  <label className="label">
                    <span className="label-text font-medium">{label}</span>
                  </label>
                  <input
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    required={required}
                    className="input input-bordered w-full"
                    placeholder={placeholder}
                  />
                </div>
              ))}

              {/* Gender Dropdown */}
              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Gender</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex w-full items-center justify-center gap-3 mt-6 flex-wrap">
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-ghost font-semibold flex items-center gap-1"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary font-bold flex items-center justify-center gap-2"
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
    </main>
  );
}
