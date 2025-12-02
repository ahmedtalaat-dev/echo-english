import React, { useEffect } from "react";
import { storiesData } from "../data/storiesData";
import { Link } from "react-router-dom";
import { setFavicon } from "../utils/setFavicon";

export default function Reading() {
  useEffect(() => {
    document.title = "Reading Practice - Echo English";
    setFavicon("/logo/reading_logo.png");
  }, []);

  return (
    <div className="flex flex-col gap-10 m-6 mt-10">
      <h1 className="text-4xl font-bold text-white text-center mb-4">
        Reading Fields
      </h1>

      {storiesData.map((field) => (
        <div key={field.field}>
          <h2 className="text-3xl font-semibold text-white mb-4 bg-gray-800/90 w-fit p-3 rounded-2xl">
            {field.field}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {field.stories.map((story) => {
              const fieldPath = field.field.toLowerCase();
              return (
                <Link
                  key={story.id}
                  to={`/${fieldPath}/${story.id}`}
                  className="bg-gray-700 rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105"
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white">
                      {story.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
