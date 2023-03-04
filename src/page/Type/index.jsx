/* eslint-disable react/jsx-one-expression-per-line */
import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase';
import Item from '../Post/components/Item';

function Type() {
  const { id } = useParams();
  const [value, loading] = useCollection(collection(firestore, 'posts'));
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (value) {
      setPost(value.docs.filter((_doc) => _doc.data().type.typeName === id));
    }
  }, [id, value]);

  return (
    <div className="bg-[#2c2f33] w-full p-8 overflow-y-scroll h-screen">
      <h1 className="text-3xl font-semibold mb-8">{id} Resources</h1>
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

export default Type;
