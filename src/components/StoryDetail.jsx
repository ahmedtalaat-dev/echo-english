import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaBook, FaLanguage } from "react-icons/fa";
import { storiesData } from "../data/storiesData";

export default function StoryDetail ()  {
  const navigate = useNavigate();
  const { id, field } = useParams();

  const [story, setStory] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isReading, setIsReading] = useState(false);

  // Search the story
  useEffect(() => {
    const fieldData = storiesData.find(
      (f) => f.field.toLowerCase() === field.toLowerCase()
    );
    const storyFound = fieldData?.stories.find(
      (s) => s.id === parseInt(id)
    );
    setStory(storyFound || null);
  }, [field, id]);

  // Stop voice when leave
  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleRead = () => {
    if (!story) return;

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(story.fullText);
      utterance.lang = "en-US";
      utterance.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 flex flex-col items-center gap-6">
      <button
        onClick={() => navigate(-1)}
        className="self-start bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Back
      </button>

      {!story ? (
        <div className="text-white mt-20 text-center">
          Story not found
        </div>
      ) : (
        <div className="bg-gray-700 p-6 rounded-2xl shadow-md flex flex-col gap-4 w-full max-w-3xl">
          <img
            src={story.image}
            alt={story.title}
            className="rounded-lg w-full h-64 object-cover"
          />
          <h2 className="text-2xl font-bold">{story.title}</h2>
          <p>{story.fullText}</p>

          {showTranslation && (
            <p className="mt-2 text-right" dir="rtl">
              {story.translationText}
            </p>
          )}

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleRead}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                isReading
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <FaBook /> {isReading ? "Stop" : "Read"}
            </button>
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              <FaLanguage /> Translate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};