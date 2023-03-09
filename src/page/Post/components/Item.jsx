/* eslint-disable operator-linebreak */
/* eslint-disable react/prop-types */
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
import { firestore } from '../../../firebase';

function Item({ item }) {
  const deleteItem = async (itemID) => {
    const docRef = doc(firestore, 'posts', itemID);
    const docData = await getDoc(docRef);
    const q = query(
      collection(firestore, 'type'),
      where('typeName', '==', docData.data().type.typeName),
    );
    const querySnapshot = await getDocs(q);
    await updateDoc(doc(firestore, 'type', querySnapshot.docs[0].id), {
      count: increment(-1),
    });
    deleteDoc(docRef);
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        if (
          !e.target.classList.contains('not-link') &&
          !e.target.parentElement.classList.contains('not-link')
        ) {
          window.open(item.data().url, '_blank');
        }
      }}
      className="bg-[#23272a] p-5 rounded-lg shadow-lg text-left"
    >
      <div className="text-2xl flex items-center justify-between">
        {item.data().name}
        <button type="button" onClick={() => deleteItem(item.id)} className="not-link">
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
  );
}

export default Item;
