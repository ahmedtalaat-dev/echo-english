import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Listening from "./pages/Listening.jsx";
import Reading from "./pages/Reading.jsx";
import Speaking from "./pages/Speaking.jsx";
import Writing from "./pages/Writing.jsx";
import StoryDetail from "./components/StoryDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/:field/:id" element={<StoryDetail />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
