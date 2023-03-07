import React from 'react';
import { Link } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { Icon } from '@iconify/react';
import { firestore } from '../firebase';

export default function TypeList() {
  const [value] = useCollection(collection(firestore, 'type'));

  return (
    <div className="flex flex-col divide-y divide-[#4a4f56]">
      {value?.docs.map((doc) => (
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
