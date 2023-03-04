/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { Icon } from '@iconify/react';
import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase';
import Item from '../Post/components/Item';

function Search() {
  const [search, setSearch] = useState('');
  const [value, loading] = useCollection(collection(firestore, 'posts'));
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (value) {
      setPost(
        value.docs.filter(
          (_doc) =>
            _doc.data().name.toLowerCase().includes(search.toLowerCase()) ||
            _doc.data().type.typeName.toLowerCase().includes(search.toLowerCase()),
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
          <Item item={item} />
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
