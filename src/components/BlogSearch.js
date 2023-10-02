import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogSearch() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchSearchResults = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(`http://localhost:3004/api/blog-search?query=${query}`);
      setSearchResults(response.data);
      setIsFetching(false);

      localStorage.setItem('cachedSearchResults', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error performing blog search:', error.message);
      setIsFetching(false);
    }
  };

  const loadCachedResults = () => {
    const cachedResults = localStorage.getItem('cachedSearchResults');
    if (cachedResults) {
      setSearchResults(JSON.parse(cachedResults));
    }
  };

  useEffect(() => {
    loadCachedResults();
  }, []);

  const handleSearch = () => {
    if (!isFetching) {
      fetchSearchResults();
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-4">Blog Search</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="flex-grow border border-gray-400 p-2 rounded-l focus:outline-none"
          placeholder="Search for blogs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 px-4 rounded-r hover:bg-blue-600 focus:outline-none"
          onClick={handleSearch}
        >
          {isFetching ? 'Searching...' : 'Search'}
        </button>
      </div>
      <div>
        {searchResults.length > 0 ? (
          <ul className="list-disc pl-6">
            {searchResults.map((blog) => (
              <li key={blog.id} className="text-base mt-2">
                {blog.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default BlogSearch;
