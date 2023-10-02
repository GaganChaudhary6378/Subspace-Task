import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';

function BlogStats() {
  const [statistics, setStatistics] = useState(null);

  
  const fetchAndCalculateStats = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3004/api/blog-stats');
      return response.data; 
    } catch (error) {
      console.error('Error fetching data from the server:', error.message);
      throw error; 
    }
  }, []);

  useEffect(() => {
    
    const cachedStats = localStorage.getItem('cachedStats');
    if (cachedStats) {
      setStatistics(JSON.parse(cachedStats));
    } else {
      fetchAndCalculateStats()
        .then((stats) => {
          setStatistics(stats);
        
          localStorage.setItem('cachedStats', JSON.stringify(stats));
        })
        .catch((error) => {
          console.error('Error fetching and setting statistics:', error.message);
        });
    }
  }, [fetchAndCalculateStats]);


  const calculateTotalBlogs = () => {
    return statistics ? statistics.totalBlogs : 0;
  };

  const findLongestTitleBlog = () => {
    return statistics ? statistics.longestTitle : '';
  };

  const countBlogsWithPrivacy = () => {
    return statistics ? statistics.blogsWithPrivacy : 0;
  };

  const createUniqueBlogTitles = () => {
    return statistics ? statistics.uniqueBlogTitles : [];
  };

 
  const getRandomColorClass = () => {
    const colors = ['text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-4">Blog Statistics</h1>
      <div className="mb-4">
        <p className="text-lg">
          Total Blogs: <span className="font-semibold">{calculateTotalBlogs()}</span>
        </p>
        <p className="text-lg">
          Longest Title: <span className="font-semibold">{findLongestTitleBlog()}</span>
        </p>
        <p className="text-lg">
          Blogs with "privacy" in title:{' '}
          <span className="font-semibold">{countBlogsWithPrivacy()}</span>
        </p>
      </div>
      <div>
        <p className="text-lg">Unique Blog Titles:</p>
        <ul className="list-disc pl-6">
          {createUniqueBlogTitles().map((title, index) => (
            <li key={index} className={`text-base font-bold ${getRandomColorClass()}`}>
              {title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BlogStats;
