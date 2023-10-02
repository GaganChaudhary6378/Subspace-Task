import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import BlogStats from './components/BlogStats';
import BlogSearch from './components/BlogSearch';
import Landing from './components/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path="/api/blog-stats" element={<BlogStats />} />
        <Route path="/api/blog-search" element={<BlogSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
