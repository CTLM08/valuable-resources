import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Icon } from "@iconify/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../firebase";
import { addTypeInDB } from "../firebase";

function Navbar() {
  const location = useLocation();
  const [addType, setAddType] = useState("");
  const [value, loading] = useCollection(collection(firestore, "type"));
  return (
    <div className=" p-5 flex flex-col w-1/3 justify-between">
      <div>
        <div className="text-2xl shadow-xl">Make React Great Again</div>
        <Link to="/">
          <div className="mt-3">#🔑-valuable-resources</div>
        </Link>{" "}
        <Link to="/search">
          <input
            placeholder="search"
            className="mt-3 bg-[#23272a] p-2 rounded-md outline-none"
            disabled={true}
          />
        </Link>
        <div className="mt-16">
          <div className="flex flex-col gap-3">
            {value?.docs.map((doc) => (
              <button className="w-min whitespace-nowrap">
                <Link to={`/${doc.data().typeName}`}>
                  {doc.data().typeName}
                </Link>
              </button>
            ))}
          </div>
          <button className="mt-4">
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
                <button className="" onClick={() => addTypeInDB(addType)}>
                  add
                </button>
              </ul>
            </div>
          </button>
        </div>
      </div>
      <Link to="/upload">
        <button className=" h-8 w-52 bg-[#424549] rounded-md relative flex items-center">
          <input
            type="text"
            placeholder="upload"
            disabled
            className="bg-transparent text-white w-full h-full outline-none p-5 "
          />
          <Icon
            icon="material-symbols:send-rounded"
            className="absolute right-2"
          />
        </button>
      </Link>
    </div>
  );
}

export default Navbar;
