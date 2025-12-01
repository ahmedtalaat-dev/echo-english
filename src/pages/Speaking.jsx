import React, { useState, useEffect } from "react";
import stringSimilarity from "string-similarity";
import { setFavicon } from "../utils/setFavicon";

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
            setAlert({ show: false, type: "", msg: "" });
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

        {/* Note */}
        <p className="text-gray-300 mt-4 text-center text-sm">
          Please speak clearly and try to match the sentence exactly.
        </p>

        {/* Alert */}
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
