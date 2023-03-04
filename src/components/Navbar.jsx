/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@iconify/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { firestore, addTypeInDB } from '../firebase';

function Navbar() {
  const [addType, setAddType] = useState('');
  const [value] = useCollection(collection(firestore, 'type'));

  return (
    <div className=" p-8 flex flex-col w-1/4 justify-between">
      <div>
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
        <div className="mt-16">
          <div className="flex flex-col divide-y divide-[#4a4f56]">
            {value?.docs.map((doc) => (
              <Link
                to={`/${doc.data().typeName}`}
                className="w-full whitespace-nowrap py-4 text-left px-4 flex items-center justify-between"
              >
                {doc.data().typeName}
                <span>{doc.data().count}</span>
              </Link>
            ))}
          </div>
          <button type="button" className="mt-4 w-full">
            <div className="dropdown w-full">
              <label
                tabIndex={0}
                className=" mb-4 w-full justify-center bg-[#4a4f56] rounded-md relative flex items-center px-4 py-3 shadow-md cursor-pointer"
              >
                + Add
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-3 bg-[#373b40] rounded-lg shadow-md w-full"
              >
                <div className="flex items-center gap-3 px-5 w-full bg-[#4a4f56] rounded-md shadow-md">
                  <Icon icon="uil:tag-alt" className="h-5 w-5 text-[#c3cedc]" />
                  <input
                    type="text"
                    className="outline-none w-full py-4 bg-transparent placeholder-[#727983] text-[#afbac7]"
                    placeholder="Type name"
                    value={addType}
                    onChange={(e) => setAddType(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (addType) {
                      addTypeInDB(addType);
                      setAddType('');
                    }
                  }}
                  className="w-full py-4 bg-[#c3cedc] text-[#2c2f33] rounded-md shadow-md font-semibold mt-4 flex items-center justify-center gap-2 hover:bg-[#b3bdc9] transition-all"
                >
                  <Icon icon="material-symbols:add-rounded" className="w-5 h-5 text-[#2c2f33]" />
                  Add
                </button>
              </ul>
            </div>
          </button>
        </div>
      </div>
      <Link to="/upload">
        <button
          type="button"
          className="w-full bg-[#4a4f56] rounded-md relative flex items-center px-4 py-3 shadow-md"
        >
          <span className="bg-transparent w-full text-left ">Add Resource</span>
          <Icon icon="material-symbols:send-rounded" className="w-5 h-5" />
        </button>
      </Link>
    </div>
  );
}

export default Navbar;
