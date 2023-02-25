import { collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";

const Type = () => {
  const { id } = useParams();
  const [value, loading] = useCollection(collection(firestore, "posts"));
  const [post, setPost] = useState([]);
  useEffect(() => {
    if (value) {
      setPost(value.docs.filter((doc) => doc.data().type == id));
    }
  }, [id, value]);
  return (
    <div className="bg-[#2c2f33]  w-full p-5 overflow-y-scroll h-screen">
      <div>
        {post.map((doc) => (
          <div>
            <div className="bg-[#23272a] p-5 ">
              <a href={doc.data().url}>
                {console.log(doc.data())}
                <div className="text-2xl">{doc.data().name}</div>
                <img src={doc.data().image} className="mt-3 h-96" />
              </a>
            </div>
          </div>
        ))}
      </div>
      <div>
        {loading && (
          <div>
            <div>Loading...</div>
          </div>
        )}
      </div>
      <div>{post.length == 0 ? <div>...</div> : ""}</div>
    </div>
  );
};

export default Type;
