import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase';

function Search() {
  const [search, setSearch] = useState('');
  const [value] = useCollection(collection(firestore, 'posts'));
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (value) {
      setPost(
        value.docs.filter(
          (doc) => doc.data().name.includes(search) || doc.data().type.includes(search),
        ),
      );
    }
  }, [value, search]);

  return (
    <div className="flex bg-[#2c2f33] w-full p-5 overflow-y-scroll h-screen flex-col">
      <input
        type="text"
        placeholder="search"
        className="mt-3 bg-[#23272a] p-2 rounded-md outline-none w-96 "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col mt-3 gap-4">
        {post.map((doc) => (
          <div>
            <div className="bg-[#23272a] p-5 ">
              <a href={doc.data().url}>
                <div className="text-2xl">{doc.data().name}</div>
                <img alt="" src={doc.data().image} className="mt-3 h-96" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
