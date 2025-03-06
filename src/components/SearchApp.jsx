import React, { useState } from "react";
import { fetchSearchResults } from "../api utilies/api";
const SearchApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSources, setSelectedSources] = useState(["google", "youtube"]);
  const [sortBy, setSortBy] = useState("relevance");
  const [results, setResults] = useState([]);
  
  const searchResults = [
    {
      title: "Introduction to Machine Learning",
      snippet: "Comprehensive guide to ML and AI innovations.",
      source: "youtube",
      date: "2024-03-15",
      relevance: 0.92,
    },
    {
      title: "Advanced AI Techniques",
      snippet: "Latest developments in deep learning architectures...",
      source: "google",
      date: "2024-03-14",
      relevance: 0.88,
    },
  ];
  


  const handleSearch = async (e) => {
    e.preventDefault(); 
    console.log("Searching for:", searchQuery);
    const data = await fetchSearchResults(searchQuery);
    data = [...data.results.google, data.results.youtube];
    setResults(data);
    // API call can be added here
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <nav className="bg-blue-600 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              className="w-full p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white-300 bg-white"
              placeholder="Search for anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-3 text-gray-500"
            >
              🔍
            </button>
          </form>
        </div>
      </nav>

      {/* Filters & Sorting */}
      <div className="max-w-4xl mx-auto mt-4 p-4 bg-white shadow-md rounded-md">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Filters:</span>
            {["google", "youtube", "linkedin"].map((source) => (
              <button
                key={source}
                className={`px-3 py-1 rounded-md ${
                  selectedSources.includes(source)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } transition`}
                onClick={() =>
                  setSelectedSources((prev) =>
                    prev.includes(source)
                      ? prev.filter((s) => s !== source)
                      : [...prev, source]
                  )
                }
              >
                {source.charAt(0).toUpperCase() + source.slice(1)}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown */}
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Sort by: Relevance</option>
            <option value="date">Sort by: Date</option>
            <option value="source">Sort by: Source</option>
          </select>
        </div>
      </div>

      {/* Search Results */}

      <div className="max-w-5xl mx-auto mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-4 rounded-md hover:shadow-lg transition"
          >
            <div className="flex items-center gap-2">
              <span
                className={
                  result.source === "youtube" ? "text-red-500" : "text-blue-500"
                }
              >
                {result.source === "youtube" ? "🎥" : "🔍"}
              </span>
              <span className="text-sm text-gray-500">
                {result.source.toUpperCase()}
              </span>
              <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-md">
                {Math.round(result.relevance * 100)}% match
              </span>
            </div>

            <h3 className="text-lg font-semibold mt-2">{result.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{result.snippet}</p>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500 overflow-hind">
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  {result.link}
                </a>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchApp;
