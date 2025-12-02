import "./App.css";
import { useContext, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { UserContext } from "./context/UserContext.js";
import CreateCourse from "./pages/CreateCourse.jsx";
import DisplaySingleCourse from "./pages/DisplaySingleCourse.jsx";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Teach = lazy(() => import("./pages/Teach"));
const Mission = lazy(() => import("./pages/Mission"));
const Course = lazy(() => import("./pages/Course"));
const Profile = lazy(() => import("./pages/Profile"));
const UpdateProfile = lazy(() => import("./pages/UpdateProfile.jsx"));

const App = () => {
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      {/* ✅ Suspense shows fallback while lazy pages load */}
      <Suspense fallback={<div className="w-screen flex items-center justify-center my-10"><div className="loading loading-dots loading-xl"></div></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />}
          />
          <Route path="/teach" element={<Teach />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/courses" element={<Course />} />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />}
          />
          <Route
            path="/update-profile"
            element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/" replace />}
          />
          <Route
            path="/create-course"
            element={isAuthenticated ? <CreateCourse /> : <Navigate to="/" replace />}
          />
          <Route
            path="/course/:id"
            element={isAuthenticated ? <DisplaySingleCourse /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
