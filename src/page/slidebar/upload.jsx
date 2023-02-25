import React, { useEffect, useState } from "react";
import { getOgImage } from "../../tools/parser.js";
import { firestore, uploadPost } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
const Upload = () => {
  const [value, loading] = useCollection(collection(firestore, "type"));
  const [DataType, setDataType] = useState("");
  const navigte = useNavigate();
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    getOgImage(url).then((res) => {
      setOgImageUrl(res);
      console.log(res);
    });
  }, [url]);

  return (
    <div className="flex items-center justify-center h-full flex-col gap-12 p-40">
      <input
        type="text"
        className="outline-none h-14 w-full  p-3 "
        placeholder="websiteName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="outline-none h-14 w-full  p-3 "
        placeholder="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="dropdown dropdown-bottom">
        <label tabIndex={0} className="btn m-1 w-32">
          {DataType ? DataType : "Select Type"}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {value?.docs.map((doc) => (
            <li>
              <a onClick={() => setDataType(doc.data().typeName)}>
                {doc.data().typeName}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() =>
          uploadPost(name, url, ogImageUrl, DataType).then(() => navigte("/"))
        }
        disabled={!name || !url || !ogImageUrl || !DataType}
      >
        Upload
      </button>
    </div>
  );
};

export default Upload;
