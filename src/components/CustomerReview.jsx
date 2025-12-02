import React from "react";

export default function CustomerReview({ name, review, image }) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col items-center text-center gap-4 max-w-sm">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p className="text-gray-300">{review}</p>
    </div>
  );
}