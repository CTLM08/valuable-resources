import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';

import Post from './page/Post/index';
import Upload from './page/Upload';

function App() {
  return (
    <div className="bg-[#2c2f33] h-[100vh] w-full overflow-hidden relative flex min-w-0">
      <Navbar />
      <div className="flex-1 md:mt-0">
        <Routes>
          {/* type cannot open */}
          <Route path="/" element={<Post />} />
          <Route path="/:id" element={<Post />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
