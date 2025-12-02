import React, { useEffect } from "react";
import { Link } from "react-router-dom"; 
import CustomerReview from "../components/CustomerReview.jsx";
import {
  FaBook,
  FaComments,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { setFavicon } from "../utils/setFavicon";

export default function Home() {
  useEffect(() => {
    document.title = "Echo English";
    setFavicon("/logo/home_logo.png");
  }, []);

  const reviews = [
    {
      name: "Ahmed Talaat",
      review: "Echo English helped me improve my speaking skills tremendously!",
      image: "/review/r1.webp",
    },
    {
      name: "Mohamed Ali",
      review: "The challenges are interactive and very easy to follow.",
      image: "/review/r2.webp",
    },
    {
      name: "Omar Ayman",
      review: "I love the personalized feedback and guidance.",
      image: "/review/r3.webp",
    },
  ];

  return (
    <div className="bg-gray-900 text-white w-full overflow-x-hidden">
      
      {/* Section 1: About Echo English */}
      <section className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 text-center gap-6 relative">
        <div className="absolute inset-0 w-full flex justify-center items-center opacity-20 animate-pulse">
          <div className="w-72 h-72 rounded-full border-4 border-blue-500 animate-ping"></div>
        </div>

        <h1 className="text-5xl font-bold z-10">Welcome to Echo English</h1>
        <p className="text-xl max-w-2xl text-gray-200 z-10">
          Learn English effectively with our interactive courses, personalized
          guidance, and real-life practice. Improve your Listening, Reading,
          Speaking, and Writing skills with ease.
        </p>
      </section>

      {/* Section 2: Advantages */}
      <section className="py-20 px-4 sm:px-6 md:px-10 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-10">Why Learn With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-700 p-6 rounded-2xl shadow-md flex flex-col items-center gap-4">
            <FaBook className="text-4xl text-blue-400" />
            <h3 className="text-2xl font-semibold mb-2">Interactive Courses</h3>
            <p className="text-gray-300">
              Engaging exercises to practice all language skills effectively.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-2xl shadow-md flex flex-col items-center gap-4">
            <FaComments className="text-4xl text-green-400" />
            <h3 className="text-2xl font-semibold mb-2">
              Personalized Feedback
            </h3>
            <p className="text-gray-300">
              Get guidance tailored to your progress and level.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-2xl shadow-md flex flex-col items-center gap-4">
            <FaClock className="text-4xl text-yellow-400" />
            <h3 className="text-2xl font-semibold mb-2">Flexible Learning</h3>
            <p className="text-gray-300">
              Learn at your own pace anytime, anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Customer Reviews */}
      <section className="py-20 px-4 sm:px-6 md:px-10 text-center">
        <h2 className="text-4xl font-bold mb-10">What Our Students Say</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {reviews.map((r, index) => (
            <CustomerReview
              key={index}
              name={r.name}
              review={r.review}
              image={r.image}
            />
          ))}
        </div>
      </section>

      {/* Section 4: Footer */}
      <footer className="bg-gray-800 py-10 text-gray-400 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Echo English</h2>
            <p className="text-gray-300 text-sm">
              Improve your English skills with interactive courses, real-life
              practice, and personalized guidance.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/reading" className="hover:text-white">
                  Reading
                </Link>
              </li>
              <li>
                <Link to="/listening" className="hover:text-white">
                  Listening
                </Link>
              </li>
              <li>
                <Link to="/speaking" className="hover:text-white">
                  Speaking
                </Link>
              </li>
              <li>
                <Link to="/writing" className="hover:text-white">
                  Writing
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook className="hover:text-blue-500" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="hover:text-blue-400" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="hover:text-pink-500" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="hover:text-blue-600" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-6 text-gray-500">
          &copy; {new Date().getFullYear()} Echo English. All rights reserved. |
          Developed by Ahmed Talaat
        </div>
      </footer>
    </div>
  );
}
