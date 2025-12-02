import React, { useState, useEffect } from "react";
import stringSimilarity from "string-similarity";
import { setFavicon } from "../utils/setFavicon";
import { sentences } from "../data/sentences";

export default function Speaking() {
  useEffect(() => {
    document.title = "Speaking Practice - Echo English";
    setFavicon("/logo/speaking_logo.png");
  }, []);

  const [current, setCurrent] = useState(0);
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });

  const cleanText = (str) => str.replace(/[.,!?]/g, "").toLowerCase().trim();

  const speakSentence = () => {
    const utter = new SpeechSynthesisUtterance(sentences[current]);
    speechSynthesis.speak(utter);
  };

  const showAlert = (type, msg) => {
    setAlert({ show: true, type, msg });
    setTimeout(() => setAlert({ show: false, type: "", msg: "" }), 1500);
  };

  const checkPronunciation = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const similarity = stringSimilarity.compareTwoStrings(
        cleanText(transcript),
        cleanText(sentences[current])
      );

      if (similarity >= 0.8) {
        showAlert("success", "✅ Correct!");
        setTimeout(() => {
          if (current < sentences.length - 1) {
            setCurrent(current + 1);
          } else {
            alert("🎉 You finished all sentences!");
          }
        }, 1000);
      } else {
        showAlert("error", "❌ Try again!");
      }
    };

    recognition.onerror = () => {
      showAlert("error", "❌ Error, please try again");
    };

    recognition.start();
  };

  const nextSentence = () => {
    if (current < sentences.length - 1) {
      setCurrent(current + 1);
      setAlert({ show: false, type: "", msg: "" });
    } else {
      alert("🎉 You finished all sentences!");
    }
  };

  return (
    <div className="bg-gray-900 text-white py-10 px-4 flex justify-center">
      <div className="w-full bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">

        <h2 className="text-3xl font-bold mb-6 text-center">🗣 Speaking Practice</h2>

        {/* sentence */}
        <div className="bg-gray-700 p-6 rounded-2xl shadow-inner border border-gray-600 mb-6 text-center flex flex-col items-center gap-4">
          <p className="text-lg">{sentences[current]}</p>
          <button
            onClick={speakSentence}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-semibold transition"
          >
            🔊 Play Sentence
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={checkPronunciation}
            className="flex-1 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-semibold transition"
          >
            🎤 Check Pronunciation
          </button>

          <button
            onClick={nextSentence}
            className="flex-1 bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-xl font-semibold transition"
          >
            ➡ Next / Skip
          </button>
        </div>

        <p className="text-gray-300 mt-4 text-center text-sm">
          Please speak clearly and try to match the sentence exactly.
        </p>

        {alert.show && (
          <div
            className={`mt-4 p-4 rounded-xl transition ${
              alert.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {alert.msg}
          </div>
        )}

      </div>
    </div>
  );
}
