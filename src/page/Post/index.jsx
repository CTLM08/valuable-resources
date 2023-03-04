import { collection } from 'firebase/firestore';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase';

import Item from './components/Item';

function Post() {
  const [value, loading] = useCollection(collection(firestore, 'posts'));

  return (
    <div className="bg-[#2c2f33] w-full p-8 overflow-y-scroll h-screen">
      <h1 className="text-3xl font-semibold mb-8">All Resources</h1>
      <div className="grid grid-cols-2 gap-4 ">
        {value?.docs.map((item) => (
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
