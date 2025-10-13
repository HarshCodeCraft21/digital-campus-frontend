import { useEffect, useState, useRef, useContext, useCallback, memo } from "react";
import { GraduationCap, Menu, X, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";

const navLinks = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "Courses", path: "/courses" },
  { id: 3, label: "Teach With Us", path: "/teach" },
  { id: 4, label: "Our Mission", path: "/mission" },
];

const SearchInput = memo(({ placeholder = "Search Courses..." }) => (
  <div className="relative w-full">
    <Search
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
      size={18}
    />
    <input
      type="text"
      placeholder={placeholder}
      className="input border-amber-500 input-sm md:input-md pl-10 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-xl"
      aria-label={placeholder}
    />
  </div>
));

const AuthButtons = memo(({ isAuthenticated, closeMenu, userValue }) => {
  if (isAuthenticated) {
    return (
      <div className="avatar">
        <div className="ring-blue-500 ring-offset-base-100 w-8 h-8 rounded-full ring-1 ring-offset-3">
          <Link
            to="/profile"
            onClick={closeMenu}
            className="flex justify-center items-center"
          >
            <img
              src={userValue?.profileUrl}
              alt="Profile"
              loading="lazy"
              className="rounded-full"
            />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Link
        to="/login"
        className="btn btn-sm md:btn-md btn-outline rounded-xl"
        onClick={closeMenu}
      >
        Login
      </Link>
      <Link
        to="/signup"
        className="btn btn-sm md:btn-md bg-blue-500 rounded-xl hover:bg-blue-600 text-white"
        onClick={closeMenu}
      >
        Sign Up
      </Link>
    </>
  );
});

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { isAuthenticated, userValue } = useContext(UserContext);
  const role = userValue?.role;

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="navbar px-4 py-4 shadow-md flex items-center justify-between bg-base-100 relative">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 flex-1">
        <GraduationCap size={48} className="text-primary" />
        <h1 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-500 to-orange-400 bg-clip-text text-transparent">
          <span className="font-bold text-3xl md:text-4xl">D</span>igital{" "}
          <span className="font-bold text-3xl md:text-4xl">C</span>ampus
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map(({ id, label, path }) => (
          <Link key={id} to={path} className="hover:text-blue-500 transition">
            {label}
          </Link>
        ))}
      </div>

      {/* Desktop Search */}
      <div className="hidden lg:block mx-4 w-64">
        <SearchInput />
      </div>

      {/* Auth Buttons (Desktop) */}
      <div className="hidden md:flex items-center gap-2">
        {role === "teacher" && isAuthenticated && (
          <button className="btn bg-blue-500 text-white rounded-xl">
            Create Course <Plus />
          </button>
        )
        }
        <AuthButtons
          isAuthenticated={isAuthenticated}
          userValue={userValue}
          closeMenu={closeMenu}
        />
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-16 left-0 w-full bg-base-100 shadow-md p-4 flex flex-col gap-4 z-50 md:hidden animate-fadeIn"
        >
          {navLinks.map(({ id, label, path }) => (
            <Link
              key={id}
              to={path}
              onClick={closeMenu}
              className="hover:text-primary transition"
            >
              {label}
            </Link>
          ))}

          <SearchInput />

          <div className="flex gap-4 mt-2">
            {role === "teacher" && isAuthenticated && (
              <button className="btn bg-blue-500 text-white rounded-xl">
                Create Course <Plus />
              </button>
            )}
            <AuthButtons
              isAuthenticated={isAuthenticated}
              userValue={userValue}
              closeMenu={closeMenu}
            />
          </div>
        </div>
      )}
    </nav>
  );
};
