// components/SearchBar.jsx
import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden"
    >
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="px-4 py-2 flex-1 outline-none text-gray-700"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 font-semibold hover:bg-blue-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
