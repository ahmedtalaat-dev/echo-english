import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setFavicon } from "../utils/setFavicon";

export default function NotFound() {
  useEffect(() => {
      document.title = "Page not found";
      setFavicon("/logo/error_logo.png");
    }, []);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl">Oops! Page not found.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white"
      >
        Go Back Home
      </button>
    </div>
  );
}
