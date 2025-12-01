import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Plus, X } from "lucide-react";
import { toast } from "react-toastify";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    introVideo: "",
  });

  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddVideo = () => setVideos([...videos, ""]);
  const handleRemoveVideo = (index) =>
    setVideos(videos.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Course created successfully!");
    navigate("/courses");
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* HEADER */}
      <div className="hero bg-gradient-to-r from-blue-500 to-orange-400 py-16 text-white">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Create Your Course
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Share your knowledge with the world and inspire thousands of
              learners.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="py-12">
        <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT SIDE — MOTIVATION CARD */}
          <div className="card bg-base-100 p-6 shadow-lg border-l-4 border-blue-100">
            <h2 className="text-2xl font-bold text-white mb-4">
              Why Create This Course?
            </h2>

            <p className="text-gray-400 mb-3">
              Every great course starts with a purpose. Whether you want to help
              beginners, build a community, or share your mastery—your knowledge
              can change someone's life.
            </p>

            <p className="text-gray-400 mb-3">
              When students learn from you, they're not just gaining skills—
              they’re gaining confidence, clarity, and a new future. Make every
              lesson count!
            </p>

            <p className="text-gray-400 font-semibold flex flex-col gap-4">
              <span className="card bg-base-300 p-4 border-l-4 border-blue-600">Teach with passion.</span>  
              <span className="card bg-base-300 p-4 border-l-4 border-blue-400">Inspire with clarity.</span>  
              <span className="card bg-base-300 p-4 border-l-4 border-blue-300">Empower with knowledge.</span>
            </p>
          </div>

          {/* RIGHT SIDE — FORM */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Thumbnail */}
                <div className="space-y-2">
                  <label className="font-semibold">Course Thumbnail *</label>

                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary cursor-pointer">
                    {thumbnailPreview ? (
                      <div className="relative">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail"
                          className="max-h-48 mx-auto rounded"
                        />
                        <button
                          type="button"
                          className="btn btn-error btn-sm mt-3"
                          onClick={() => setThumbnailPreview("")}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="thumbnail" className="cursor-pointer block">
                        <Upload className="h-12 w-12 mx-auto mb-2 opacity-60" />
                        <p className="text-sm opacity-60">
                          Click to upload thumbnail
                        </p>
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
                <div className="space-y-2">
                  <label className="font-semibold">Course Title *</label>
                  <input
                    type="text"
                    placeholder="e.g., Full Stack Web Development"
                    className="input input-bordered w-full"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="font-semibold">Description *</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your course..."
                    className="textarea textarea-bordered w-full"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  ></textarea>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="font-semibold">Category *</label>
                  <input
                    type="text"
                    placeholder="e.g., Programming, Design"
                    className="input input-bordered w-full"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="font-semibold">Price (₹) *</label>
                  <input
                    type="number"
                    placeholder="2999"
                    className="input input-bordered w-full"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Intro Video */}
                <div className="space-y-2">
                  <label className="font-semibold">Intro Video URL *</label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/embed/..."
                    className="input input-bordered w-full"
                    value={formData.introVideo}
                    onChange={(e) =>
                      setFormData({ ...formData, introVideo: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Videos */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold">Course Videos</label>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={handleAddVideo}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Video
                    </button>
                  </div>

                  {videos.map((_, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="file"
                        accept="video/*"
                        className="file-input file-input-bordered w-full"
                      />

                      <button
                        type="button"
                        className="btn btn-error btn-sm"
                        onClick={() => handleRemoveVideo(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Create Course
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
