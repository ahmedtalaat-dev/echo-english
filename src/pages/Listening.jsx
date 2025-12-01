import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { setFavicon } from "../utils/setFavicon";

export default function Listening() {
  useEffect(() => {
    document.title = "Listening Practice - Echo English";
    setFavicon("/logo/listening_logo.png");
  }, []);

  // 100 Most Common Sentences in English
  const sentences = [
    "Hello, how are you doing today?",
    "Can you tell me your name, please?",
    "Where exactly are you from?",
    "I have been learning English for two years.",
    "Could you help me with this task?",
    "Do you know what time it is?",
    "I'm afraid I don't understand.",
    "Could you please repeat that slowly?",
    "Where do you usually live?",
    "I currently live in Cairo, Egypt.",
    "What is your profession?",
    "I am studying computer science at university.",
    "It is nice to finally meet you.",
    "How old are your children?",
    "I am turning twenty-one next month.",
    "What is this object called?",
    "Do you know what that is for?",
    "I really like this song.",
    "I am not a fan of that movie.",
    "May I ask you a personal question?",
    "Where are you heading right now?",
    "I am going to the library to study.",
    "Today has been very busy for me.",
    "Can you repeat that one more time?",
    "Please try to speak more slowly.",
    "Do you happen to speak English?",
    "I can speak a little, but not fluently.",
    "I try to learn something new every day.",
    "I really need some assistance here.",
    "Could you show me how to do it?",
    "What is your favorite type of cuisine?",
    "My favorite dish is definitely pizza.",
    "Do you have a favorite color?",
    "I personally like shades of blue.",
    "Where do you usually work?",
    "I work remotely from home most days.",
    "Do you enjoy listening to music?",
    "I love discovering new music every week.",
    "What are you currently doing?",
    "I am reviewing my notes right now.",
    "Where did you travel yesterday?",
    "I went shopping at the local market.",
    "What would you like to eat today?",
    "I am craving some roasted chicken.",
    "Do you have any questions so far?",
    "No, I think everything is clear.",
    "Could you explain this concept once more?",
    "This seems to be quite easy for me.",
    "However, some parts are rather difficult.",
    "I feel very tired after that long walk.",
    "I am extremely hungry right now.",
    "I am also a little thirsty.",
    "I am feeling happy today, thank you.",
    "Unfortunately, I am not feeling well.",
    "What exactly is happening there?",
    "Everything seems to be going fine.",
    "I will call you in a few minutes.",
    "I will send you the document by email.",
    "Please wait just a moment.",
    "I am on my way right now.",
    "I will arrive there very soon.",
    "I am fully ready for the meeting.",
    "I am not prepared yet for this task.",
    "What is your opinion on this matter?",
    "In my opinion, it looks good.",
    "I am afraid I think it's not right.",
    "I completely agree with your point.",
    "Sorry, but I don't agree with that.",
    "That story was very interesting.",
    "What you did is truly amazing.",
    "Could you give me an example, please?",
    "Can you write down what you just said?",
    "I really like the idea you suggested.",
    "I just came up with an idea myself.",
    "Oops, I completely forgot about it.",
    "Now I remember exactly what happened.",
    "What does this phrase actually mean?",
    "It really means a lot to me personally.",
    "I definitely need more time to finish.",
    "I should practice this more often.",
    "Could you tell me a bit more about it?",
    "What should be my next step now?",
    "You might want to try again carefully.",
    "Are we ready to start the project?",
    "Yes, let's begin right away.",
    "Let's take a short break first.",
    "That explanation was very helpful, thanks.",
    "Thank you very much for your assistance.",
    "You're most welcome!",
    "I will see you soon at the office.",
    "I hope to see you tomorrow as planned.",
    "Have a great day ahead!",
    "Good night and sweet dreams.",
    "Please take care of yourself.",
    "Good luck with your exams!",
    "I sincerely believe in you.",
    "You absolutely can do it!",
    "Don't worry, everything will be okay.",
    "Let's continue practicing together.",
    "This should be the final sentence for now.",
  ];

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
