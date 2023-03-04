import { Icon } from '@iconify/react';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase';

function Post() {
  const [value, loading] = useCollection(collection(firestore, 'posts'));

  return (
    <div className="bg-[#2c2f33] w-full p-8 overflow-y-scroll h-screen">
      <h1 className="text-3xl font-semibold mb-8">All Resources</h1>
      <div className="grid grid-cols-2 gap-4 ">
        {value?.docs.map((item) => (
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
                onClick={async () => {
                  const docRef = doc(firestore, 'posts', item.id);
                  const docData = await getDoc(docRef);
                  console.log(docData.data());
                  const q = query(
                    collection(firestore, 'type'),
                    where('typeName', '==', docData.data().type.typeName),
                  );

                  const querySnapshot = await getDocs(q);

                  await updateDoc(doc(firestore, 'type', querySnapshot.docs[0].id), {
                    count: increment(-1),
                  });
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

export default Post;
