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
        <Link to="/search">
          <input
            placeholder="search"
            className="mt-3 bg-[#23272a] p-2 rounded-md outline-none"
            disabled
          />
        </Link>
        <div className="mt-16">
          <div className="flex flex-col gap-3">
            {value?.docs.map((doc) => (
              <button type="button" className="w-min whitespace-nowrap">
                <Link to={`/${doc.data().typeName}`}>{doc.data().typeName}</Link>
              </button>
            ))}
          </div>
          <button type="button" className="mt-4">
            <div className="dropdown">
              <label tabIndex={0} className=" m-1">
                + Add
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-3 shadow bg-base-100 rounded-box w-52 "
              >
                <input
                  type="text"
                  placeholder="add new type"
                  className="w-full rounded-md outline-none text-center bg-white text-black "
                  value={addType}
                  onChange={(e) => setAddType(e.target.value)}
                />
                <button type="button" className="" onClick={() => addTypeInDB(addType)}>
                  add
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
