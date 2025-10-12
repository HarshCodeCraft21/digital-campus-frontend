import { useState, useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Upload, Loader2, Image as ImageIcon } from "lucide-react";
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

  // ✅ Image state
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(userValue?.profileUrl || "");
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Change (memoized to avoid unnecessary re-renders)
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // ✅ Image upload handler with validation + cleanup
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
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  }, []);

  useMemo(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
      if (image) payload.append("profileUrl", image);
      const res = await ProfileUpdate(payload);
      setUserValue(res.userData);

      toast.success("Profile updated successfully!");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
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
            <p className="text-base-content/60">One Campus Infinite Learning</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-3">
              <div className="avatar">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center bg-base-300 w-full h-full text-base-content/40">
                      <ImageIcon className="h-8 w-8" />
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
                className="hidden"
                onChange={handleImageUpload}
              />
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full font-bold"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
