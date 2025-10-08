import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center text-gray-900 rounded-3xl  p-12 max-w-md w-full animate-fade-in">
        <h1 className="text-7xl font-extrabold mb-4 text-blue-500 animate-bounce">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="mb-6 text-gray-600">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <a
          href="/"
          className="btn btn-primary btn-lg transition-transform transform hover:scale-105"
        >
          Go Back Home
        </a>
      </div>
      <p className="mt-6 text-white/70 text-sm">
        {`Tried to access: ${location.pathname}`}
      </p>
    </div>
  );
};

export default NotFound;
