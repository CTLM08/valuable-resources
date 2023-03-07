/* eslint-disable react/jsx-one-expression-per-line */
import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import Input from '../../components/Input';
import { firestore } from '../../firebase';

import Item from './components/Item';

function Post() {
  const [value, loading] = useCollection(collection(firestore, 'posts'));
  const [searchQuery, setSearchQuery] = useState('');
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (value) {
      setPost(id ? value.docs.filter((_doc) => _doc.data().type.typeName === id) : value.docs);
    }
  }, [id, value]);

  return (
    <div className="bg-[#2c2f33] w-full p-8 overflow-y-scroll h-screen">
      <h1 className="text-3xl font-semibold flex-shrink-0 mb-8">
        {id ?? 'All'} Resources <span className="text-base">({post.length})</span>
      </h1>
      <Input
        value={searchQuery}
        setValue={setSearchQuery}
        placeholder="Search resouces"
        icon="uil:search"
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-4 mt-8">
        {post
          .filter((doc) => doc.data().name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((item) => (
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

export default Post;
