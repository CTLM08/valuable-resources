import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';

import Post from './page/Post/index';
import Search from './page/Search';
import Type from './page/Type';
import Upload from './page/Upload';

function App() {
  return (
    <div className="bg-[#2c2f33] h-[100vh] w-full flex">
      <Navbar />
      <div className="flex-1">
        <Routes>
          {/* type cannot open */}
          <Route path="/" element={<Post />} />
          <Route path="/:id" element={<Type />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
