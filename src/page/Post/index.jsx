import { collection, doc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase.js";

const Post = () => {
  const [value, loading, error] = useCollection(collection(firestore, "posts"));
  const navigate = useNavigate();
  return (
    <div className="bg-[#2c2f33]  w-full p-5 overflow-y-scroll h-screen">
      <div>
        {JSON.stringify(error)}
        <div className="flex flex-col gap-4 ">
          {value?.docs.map((doc) => (
            <div className="bg-[#23272a] p-5 ">
              <a href={doc.data().url}>
                {console.log(doc.data())}
                <div className="text-2xl">{doc.data().name}</div>
                <img src={doc.data().image} className="mt-3 h-96" />
              </a>
            </div>
          ))}
        </div>
      </div>
      <div>
        {loading && (
          <div>
            <div>Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
