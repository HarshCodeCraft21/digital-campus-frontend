import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  LogOut,
  Play,
  MessageSquare,
  BookOpen,
  Plus,
  Trash,
} from "lucide-react";
import { UserContext } from "../context/UserContext.js";
import Banner from "../assets/Banner.PNG";
import { useCourse } from "../context/CourseContext.jsx";
import { deleteCourse } from "../controllers/Course.js";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const { userValue, setIsAuthenticated } = useContext(UserContext);
  const { course, fetchAllCourses } = useCourse();

  const handleLogout = () => {
    localStorage.removeItem("JwtToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  const updateProfile = () => {
    navigate("/update-profile");
    window.scrollTo(0, 0);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId);
      await fetchAllCourses();
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-8 px-4">
      {/* Cover */}
      <div className="relative w-full max-w-6xl rounded-2xl shadow-xl">
        <img
          src={Banner}
          alt="Cover"
          className="w-full h-48 sm:h-64 md:h-72 object-cover"
        />

        {/* Avatar */}
        <div className="absolute left-1/2 -bottom-16 -translate-x-1/2 sm:left-12 sm:translate-x-0">
          <div className="avatar">
            <div className="w-28 sm:w-32 md:w-36 rounded-full ring-4 ring-primary ring-offset-2 bg-base-100 shadow-lg">
              <img
                src={
                  userValue?.profileUrl ||
                  "https://api.dicebear.com/9.x/adventurer/svg?seed=John"
                }
                alt="Profile Avatar"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="w-full max-w-6xl bg-base-100 rounded-2xl shadow-lg mt-20 p-6 sm:p-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold">
              {userValue?.fullName || "Guest"}
            </h2>
            <p className="text-base-content/70 text-lg capitalize">
              {userValue?.role || "Student"}
            </p>
          </div>

          <button
            className="btn btn-error text-white rounded-full w-full sm:w-auto flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>

        {/* Logout Modal */}
        {open && (
          <dialog open className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirm Logout</h3>
              <p className="py-4">Are you sure you want to log out?</p>
              <div className="modal-action">
                <button className="btn" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-error text-white" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={() => setOpen(false)}>close</button>
            </form>
          </dialog>
        )}

        <div className="divider" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Contact Info */}
          <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg transition-all p-5">
            <div className="flex flex-col items-center md:items-start space-y-3 text-center md:text-left">
              <div className="flex items-center gap-3 text-base-content">
                <Mail className="text-primary w-5 h-5" />
                <span>{userValue?.email}</span>
              </div>

              <button
                className="btn btn-accent rounded-full w-full text-white flex items-center justify-center gap-2 mt-2"
                onClick={updateProfile}
              >
                <MessageSquare className="w-4 h-4" /> Update Profile
              </button>

              <div className="mt-4 text-sm text-base-content/70">
                {userValue?.role === "student" ? (
                  <p>Total Courses Taken: 12</p>
                ) : (
                  <p>Total Students Enrolled: 1200</p>
                )}
              </div>
            </div>
          </div>

          {/* Video Card */}
          <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg transition-all duration-300">
            <figure className="relative">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80"
                alt="Video"
                className="w-full h-40 sm:h-48 object-cover"
              />
              <button className="btn btn-circle btn-primary absolute inset-0 m-auto opacity-90 hover:opacity-100">
                <Play className="w-5 h-5" />
              </button>
            </figure>
            <div className="card-body text-center sm:text-left">
              <h3 className="card-title text-lg font-bold">Introduction</h3>
              <p className="text-sm text-base-content/70">
                Watch an introduction video about your instructor.
              </p>
            </div>
          </div>

          {/* Courses Card */}
          <div className="card bg-base-100 border border-base-300 hover:shadow-2xl transition-all duration-300">
            <div className="card-body items-center sm:items-start">
              <h3 className="card-title text-2xl font-bold text-primary">
                {userValue.role === "teacher" ? "Your Courses" : "Registered Courses"}
              </h3>

              <div className="stats shadow bg-base-200 rounded-xl mt-3">
                <div className="stat place-items-center">
                  <div className="stat-title">Total Courses</div>
                  <div className="stat-value text-primary">
                    {userValue.role === "teacher" ? course.length : 0}
                  </div>
                </div>
              </div>

              {/* Course List */}
              <div className="mt-6 w-full">
                <h4 className="text-lg font-semibold mb-3 text-base-content/80">
                  Your Courses
                </h4>

                <div className="bg-base-200 rounded-xl p-4 h-48 overflow-y-auto shadow-inner">
                  {course && userValue.role === "teacher" ? (
                    course.map((c) => (
                      <div key={c._id}>
                        {deleteTarget === c._id ? (
                          // CONFIRMATION CARD
                          <div className="flex items-center justify-between bg-base-100 border border-white rounded-lg p-3 mb-3">
                            <p className="font-medium text-white text-left">
                              Delete this course?
                            </p>

                            <div className="flex items-center gap-3">
                              <button
                                className="btn btn-xs"
                                onClick={() => setDeleteTarget(null)}
                              >
                                Cancel
                              </button>

                              <button
                                className="btn btn-xs btn-error text-white"
                                onClick={() => handleDeleteCourse(c._id)}
                              >
                                Yes, Delete
                              </button>
                            </div>
                          </div>
                        ) : (
                          // NORMAL CARD
                          <div className="flex items-center justify-between bg-base-100 rounded-lg p-3 mb-3 shadow-sm hover:shadow-md transition-all">
                            <p className="font-medium">{c.title}</p>

                            <div className="flex items-center gap-4">
                              <button
                                className="btn btn-xs btn-primary"
                                onClick={() => navigate(`/course/${c._id}`)}
                              >
                                Show
                              </button>

                              <button
                                className="btn btn-xs bg-red-400 p-3 border-none"
                                onClick={() => setDeleteTarget(c._id)}
                              >
                                <Trash
                                  className="text-white"
                                  strokeWidth={1}
                                  size={23}
                                />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full text-base-content/50 italic">
                      No courses added yet
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              {userValue?.role === "student" ? (
                <Link to="/courses" className="w-full mt-6">
                  <button className="btn btn-primary w-full rounded-full flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" /> Browse All Courses
                  </button>
                </Link>
              ) : (
                <Link to="/create-course" className="w-full mt-6">
                  <button className="btn btn-primary w-full rounded-full flex items-center justify-center gap-2">
                    Create Course <Plus className="w-4 h-4" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
