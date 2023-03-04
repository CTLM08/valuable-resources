/* eslint-disable operator-linebreak */
import { Icon } from '@iconify/react';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase';

function Search() {
  const [search, setSearch] = useState('');
  const [value, loading] = useCollection(collection(firestore, 'posts'));
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (value) {
      setPost(
        value.docs.filter(
          (doc) =>
            doc.data().name.toLowerCase().includes(search.toLowerCase()) ||
            doc.data().type.typeName.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [value, search]);

  return (
    <div className="bg-[#2c2f33] w-full p-8 overflow-y-scroll h-screen">
      <h1 className="text-3xl font-semibold mb-8">Search Resources</h1>
      <div className="flex items-center gap-3 px-5 w-full bg-[#373b40] rounded-md shadow-md mb-8">
        <Icon icon="uil:search" className="h-5 w-5 text-[#c3cedc]" />
        <input
          type="text"
          className="outline-none w-full py-4 bg-transparent placeholder-[#727983] text-[#afbac7]"
          placeholder="Search resources"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 ">
        {post.map((item) => (
          <button
            type="button"
            onClick={(e) => {
              if (!e.target.classList.contains('not-link')) {
                window.open(item.data().url, '_blank');
              }
            }}
            className="bg-[#23272a] p-5 rounded-lg shadow-lg"
          >
            <div className="text-2xl flex items-center justify-between">
              {item.data().name}
              <button
                type="button"
                onClick={() => {
                  const docRef = doc(firestore, 'posts', item.id);
                  deleteDoc(docRef);
                }}
                className="not-link"
              >
                <Icon icon="uil:trash" className="text-xl text-red-500 not-link" />
              </button>
            </div>
            <img
              alt=""
              referrerPolicy="no-referrer"
              src={
                item.data().image ||
                'https://via.placeholder.com/1200x600/23272a/c3cedc?text=No+Thumbnail'
              }
              className="mt-3 h-56 rounded-lg object-cover w-full"
            />
          </button>
        ))}
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
}

export default Search;
