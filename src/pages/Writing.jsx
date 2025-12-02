import React, { useState, useEffect } from "react";
import { writingTopics } from "../data/writingTopics";
import { setFavicon } from "../utils/setFavicon";

export default function Writing() {
  useEffect(() => {
    document.title = "Writing Practice - Echo English";
    setFavicon("/logo/writing_logo.png");
  }, []);

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [paragraph, setParagraph] = useState("");
  const [message, setMessage] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const currentTopic = writingTopics[currentTopicIndex];
  const mandatoryWords = currentTopic.mandatoryWords;

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  // ----- allowed Repeat Words -----
  const allowedRepeatWords = {
    pronouns: [
      "i","me","you","he","him","she","her","it","we","us","they","them",
      "my","mine","your","yours","his","her","hers","its","our","ours","their","theirs"
    ],

    articles: ["the","a","an"],

    conjunctions: [
      "and","or","but","nor","for","so","yet","although","because","since","unless","while","whereas"
    ],

    auxVerbs: [
      "am","is","are","was","were","be","being","been",
      "have","has","had","having",
      "do","does","did","doing",
      "will","would","shall","should","can","could","may","might","must"
    ],

    prepositions: [
      "about","above","across","after","against","along","among","around","at",
      "before","behind","below","beneath","beside","between","beyond","but","by",
      "concerning","despite","down","during","except","for","from","in","inside",
      "into","like","near","of","off","on","onto","out","outside","over","past",
      "regarding","since","through","throughout","to","toward","under","underneath",
      "until","up","upon","with","within","without"
    ]
  };

  const isRepeatAllowed = (word) => {
    return Object.values(allowedRepeatWords).some(list => list.includes(word));
  };
  // -----------------------------------

  const handleCheck = () => {
    const words = paragraph
      .toLowerCase()
      .replace(/[^a-z\s]/gi, "")
      .split(/\s+/)
      .filter(Boolean);

    if (words.length < 50) {
      showMessage("Your paragraph must have at least 50 words.");
      return;
    }

    const missingWords = mandatoryWords.filter(
      (w) => !words.includes(w.toLowerCase())
    );

    if (missingWords.length > 0) {
      showMessage(`You missed mandatory words: ${missingWords.join(", ")}`);
      return;
    }

    const repeatedWords = words.filter(
      (w, i) => words.indexOf(w) !== i && !isRepeatAllowed(w)
    );

    if (repeatedWords.length > 0) {
      showMessage(
        `You repeated words that are not allowed: ${[...new Set(repeatedWords)].join(", ")}`
      );
      return;
    }

    showMessage("✅ Correct! Well done!");

    setTimeout(() => {
      handleNextTopic();
    }, 2000);
  };

  const handleNextTopic = () => {
    const nextIndex = (currentTopicIndex + 1) % writingTopics.length;
    setCurrentTopicIndex(nextIndex);
    setParagraph("");
    setWordCount(0);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Topic:</h1>
      <h2 className="text-2xl font-semibold mb-6 text-yellow-400">
        {currentTopic.title}
      </h2>

      <div className="bg-gray-800 p-4 rounded-2xl mb-4 w-full max-w-3xl">
        <p className="mb-2 font-bold">Instructions:</p>
        <ul className="list-disc list-inside mb-2">
          <li>Write a paragraph with at least 50 words.</li>
          <li>Use the mandatory words below.</li>
          <li>
            Do not repeat any word except pronouns, articles, conjunctions,
            auxiliary verbs, and prepositions.
          </li>
        </ul>

        <div className="flex flex-wrap gap-2 mb-2">
          {mandatoryWords.map((word, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg border-2 border-gray-500 font-bold"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <textarea
        className="w-full max-w-3xl min-h-40 p-4 bg-gray-700 border border-gray-600 rounded-2xl focus:outline-none"
        placeholder="Write your paragraph here..."
        value={paragraph}
        onChange={(e) => {
          setParagraph(e.target.value);
          const words = e.target.value
            .toLowerCase()
            .replace(/[^a-z\s]/gi, "")
            .split(/\s+/)
            .filter(Boolean);
          setWordCount(words.length);
        }}
        onPaste={(e) => e.preventDefault()}
      />

      <div className="mt-4 flex gap-4">
        <button
          onClick={handleCheck}
          className="py-3 px-6 bg-green-600 hover:bg-green-700 rounded-xl font-bold"
        >
          Check
        </button>
        <button
          onClick={handleNextTopic}
          className="py-3 px-6 bg-red-600 hover:bg-red-700 rounded-xl font-bold"
        >
          Skip Topic
        </button>
      </div>

      {message && (
        <div className="mt-4 p-3 bg-blue-600 rounded-xl text-center">
          {message}
        </div>
      )}

      <div className="mt-4 text-gray-300">
        Word count: {wordCount}
      </div>
    </div>
  );
}
