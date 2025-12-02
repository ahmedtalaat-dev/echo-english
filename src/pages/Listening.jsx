import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { setFavicon } from "../utils/setFavicon";
import { sentences } from "../data/sentences";

export default function Listening() {
  useEffect(() => {
    document.title = "Listening Practice - Echo English";
    setFavicon("/logo/listening_logo.png");
  }, []);

  // LEVEL SPEED
  const voiceSpeed = {
    beginner: 0.7,
    intermediate: 1,
    advanced: 2,
  };

  // PROGRESS COLORS
  const progressColor = {
    beginner: "bg-green-500",
    intermediate: "bg-orange-500",
    advanced: "bg-red-500",
  };

  const [level, setLevel] = useState("beginner");
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });

  const speakSentence = () => {
    const utter = new SpeechSynthesisUtterance(sentences[current]);
    utter.rate = voiceSpeed[level];
    speechSynthesis.speak(utter);
  };

  const showAlert = (type, msg) => {
    setAlert({ show: true, type, msg });
    setTimeout(() => setAlert({ show: false, type: "", msg: "" }), 1500);
  };

  const checkAnswer = () => {
    const cleanUser = answer.trim().toLowerCase();
    const cleanCorrect = sentences[current].toLowerCase();

    if (cleanUser === cleanCorrect) {
      showAlert("success", "Correct!");
      if (current < sentences.length - 1) {
        setCurrent(current + 1);
        setAnswer("");
      }
    } else {
      showAlert("error", "Try again!");
    }
  };

  const skipQuestion = () => {
    if (current < sentences.length - 1) {
      setCurrent(current + 1);
      setAnswer("");
    }
  };

  const changeLevel = (e) => {
    setLevel(e.target.value);
    setCurrent(0);
    setAnswer("");
  };

  return (
    <div className="bg-gray-900 text-white py-10 px-4 flex justify-center">
      <div className="w-full bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center">
          🎧 Listening Practice
        </h2>

        {/* Level Selector */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300 font-medium">
            Select Level
          </label>
          <select
            value={level}
            onChange={changeLevel}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-green-400"
          >
            <option value="beginner">Beginner (Slow)</option>
            <option value="intermediate">Intermediate (Normal)</option>
            <option value="advanced">Advanced (Fast)</option>
          </select>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 h-2 rounded mb-6">
          <div
            className={`h-2 rounded transition-all ${progressColor[level]}`}
            style={{
              width: `${((current + 1) / sentences.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Play Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={speakSentence}
            className="w-16 h-16 bg-green-500 hover:bg-green-600 text-black rounded-full flex items-center justify-center shadow-lg transition"
          >
            <FaPlay size={22} />
          </button>
        </div>

        {/* Input */}
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type what you hear..."
          className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-xl mb-4 focus:ring-2 focus:ring-green-400"
        />

        {/* Buttons */}
        <div className="flex gap-3 mb-3">
          <button
            onClick={checkAnswer}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            Check Answer
          </button>

          <button
            onClick={skipQuestion}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            Skip
          </button>
        </div>

        {/* Note */}
        <p className="text-center text-gray-300 text-sm mb-4">
          Please end your answer with <strong>.</strong> or <strong>?</strong>{" "}
          according to what you hear.
        </p>

        {/* Alert */}
        {alert.show && (
          <div
            className={`mt-4 p-4 text-center rounded-xl animate-fade ${
              alert.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {alert.msg}
          </div>
        )}
      </div>

      <style>{`
        .animate-fade {
          animation: fadeInOut 1.5s ease-in-out;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
