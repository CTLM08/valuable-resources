/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { Icon } from '@iconify/react';
import { firestore } from '../firebase';

export default function TypeList({ categorySearchQuery }) {
  const [value] = useCollection(collection(firestore, 'type'));

  return (
    <div className="flex flex-col divide-y divide-[#4a4f56] overflow-scroll flex-shrink">
      <Link
        to="/"
        className="w-full whitespace-nowrap py-4 text-left px-4 flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          <Icon icon="uil:layers-alt" className="h-5 w-5 mr-2" />
          All
        </span>
        <span>{value?.docs.reduce((a, b) => a + b.data().count, 0)}</span>
      </Link>
      {value?.docs
        .filter((doc) =>
          doc.data().typeName.toLowerCase().includes(categorySearchQuery.toLowerCase()),
        )
        .map((doc) => (
          <Link
            to={`/${encodeURIComponent(doc.data().typeName)}`}
            className="w-full whitespace-nowrap py-4 text-left px-4 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Icon icon={doc.data().icon} className="h-5 w-5 mr-2" />
              {doc.data().typeName}
            </span>
            <span>{doc.data().count}</span>
          </Link>
        ))}
    </div>
  );
}
