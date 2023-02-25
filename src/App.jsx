import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Post from "./page/Post/index.jsx";
import Search from "./page/slidebar/search.jsx";
import Type from "./page/slidebar/type.jsx";
import Upload from "./page/slidebar/upload.jsx";
const App = () => {
  return (
    <div className="bg-[#2c2f33] h-[100vh] w-full flex  ">
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
};

export default App;
