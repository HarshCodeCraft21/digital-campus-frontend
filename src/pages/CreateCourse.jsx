import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import { createCourse } from "../controllers/Course";

const categories = [
  "Technology",
  "Business",
  "Education",
  "Health & Fitness",
  "Arts & Culture",
  "Sports",
  "Entertainment",
  "Finance",
  "Lifestyle",
  "Others",
];

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    introVideo: "",
    driveLink: "",
  });

  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnailFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setThumbnailPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { title, description, price, category, introVideo, driveLink } = formData;

      const res = await createCourse(
        thumbnailFile,
        title,
        description,
        price,
        category,
        introVideo,
        driveLink
      )
      if (res.success) {
        toast.success("Course Create Successfully!")
      }
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create course");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* HEADER */}
      <div className="hero bg-gradient-to-r from-blue-500 to-orange-400 py-16 text-white text-center flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-bold">Create Your Course</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Share your knowledge with the world and inspire thousands of learners.
        </p>
      </div>

      {/* MAIN */}
      <div className="py-12">
        <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT INFO CARD */}
          <div className="card bg-base-100 p-6 shadow-lg border-l-4 border-blue-200">
            <h2 className="text-2xl font-bold text-white mb-4">Why Create This Course?</h2>
            <p className="text-gray-400 mb-2">
              Your knowledge can change someone's life.
            </p>
            <div className="text-gray-400 font-semibold flex flex-col gap-4 mt-4">
              <span className="card bg-base-300 p-4 border-l-4 border-blue-600">Teach with passion.</span>
              <span className="card bg-base-300 p-4 border-l-4 border-blue-400">Inspire with clarity.</span>
              <span className="card bg-base-300 p-4 border-l-4 border-blue-300">Empower with knowledge.</span>
            </div>
          </div>

          {/* FORM */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Thumbnail */}
                <div>
                  <label className="font-semibold">Course Thumbnail *</label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary cursor-pointer">
                    {thumbnailPreview ? (
                      <div className="relative">
                        <img src={thumbnailPreview} className="max-h-48 mx-auto rounded" />
                        <button
                          type="button"
                          className="btn btn-error btn-sm mt-3"
                          onClick={() => {
                            setThumbnailPreview("");
                            setThumbnailFile(null);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="thumbnail" className="block cursor-pointer">
                        <Upload className="h-12 w-12 mx-auto opacity-60" />
                        <p className="text-sm opacity-60">Click to upload</p>
                        <input
                          id="thumbnail"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleThumbnailUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="font-semibold">Course Title *</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="font-semibold">Description *</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={4}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  ></textarea>
                </div>

                {/* Category (Dropdown) */}
                <div>
                  <label className="font-semibold">Category *</label>
                  <select
                    className="select select-bordered w-full"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select category</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="font-semibold">Price (₹) *</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                {/* Intro Video */}
                <div>
                  <label className="font-semibold">Intro Video URL *</label>
                  <input
                    type="url"
                    className="input input-bordered w-full"
                    onChange={(e) => setFormData({ ...formData, introVideo: e.target.value })}
                    required
                  />
                </div>

                {/* Google Drive Link */}
                <div>
                  <label className="font-semibold">Google Drive Link *</label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    className="input input-bordered w-full"
                    onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                    required
                  />
                </div>

                <button className="btn btn-primary w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="loading loading-spinner loading-sm"></span>
                      Submitting...
                    </span>
                  ) : (
                    "Create Course"
                  )}
                </button>


              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
