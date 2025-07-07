import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewsBySlug from './pages/NewsBySlug';
import CategoryNews from './pages/CategoryNews';
import SearchNewsPage from './pages/SearchNewsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:slug" element={<NewsBySlug />} />
        <Route path="/news/category/:category" element={<CategoryNews />} />
        <Route path="/search/news" element={<SearchNewsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
