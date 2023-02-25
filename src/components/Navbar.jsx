import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Icon } from "@iconify/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../firebase";

function Navbar() {
  const location = useLocation();
  const [value, loading] = useCollection(collection(firestore, "type"));
  return (
    <div className=" p-5 flex flex-col w-1/3 justify-between">
      <div>
        <div className="text-2xl shadow-xl">Make React Great Again</div>
        <Link to="/">
          <div className="mt-3">#🔑-valuable-resources</div>
        </Link>{" "}
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
