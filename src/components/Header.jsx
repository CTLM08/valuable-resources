import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <div className="text-xl font-semibold">Make React Great Again</div>
      <Link to="/">
        <div className="mt-3"># 🔑-valuable-resources</div>
      </Link>
      <Link
        to="/search"
        className="mt-8 bg-[#4a4f56] p-3 rounded-md outline-none w-full text-center text-[#c3cedc] flex items-center justify-center gap-2"
      >
        <Icon icon="material-symbols:search-rounded" className="h-5 w-5" />
        Search
      </Link>
    </>
  );
}

export default Header;
