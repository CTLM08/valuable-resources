/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { Listbox, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { firestore, uploadPost } from '../../firebase';
import getOgImage from '../../tools/parser';

function Upload() {
  const [value] = useCollection(collection(firestore, 'type'));
  const [DataType, setDataType] = useState('Select type');
  const [name, setName] = useState('');
  const [url, setURL] = useState('');

  const navigte = useNavigate();

  return (
    <div className="flex items-center justify-center h-full flex-col gap-4 p-40">
      <div className="flex justify-center w-full items-center gap-4 text-3xl mb-6">
        <Icon icon="uil:upload" className="h-9 w-9 text-[#c3cedc]" />
        Add Resource
      </div>
      <div className="flex items-center gap-3 px-5 w-full bg-[#373b40] shadow-md rounded-md">
        <Icon icon="uil:tag-alt" className="h-5 w-5 text-[#c3cedc]" />
        <input
          type="text"
          className="outline-none w-full py-4 bg-transparent placeholder-[#727983] text-[#afbac7]"
          placeholder="Website Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3 px-5 w-full bg-[#373b40] rounded-md shadow-md">
        <Icon icon="uil:link" className="h-5 w-5 text-[#c3cedc]" />
        <input
          type="text"
          className="outline-none w-full py-4 bg-transparent placeholder-[#727983] text-[#afbac7]"
          placeholder="URL Link"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
      </div>
      <Listbox value={DataType} onChange={setDataType}>
        <div className="relative w-full">
          <Listbox.Button className="relative w-full flex rounded-md bg-[#373b40] py-4 pl-5 items-center gap-3 text-left shadow-md focus:outline-none">
            <Icon
              icon={DataType !== 'Select type' ? `simple-icons:${DataType.icon}` : 'uil:apps'}
              className="h-5 w-5 text-[#c3cedc]"
            />
            <span className="block truncate">{DataType.typeName ?? DataType}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
              <Icon icon="uil:angle-down" className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#373b40] py-1 text-base shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {value?.docs.map((type, typeIdx) => (
                <Listbox.Option
                  key={typeIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-4 pl-10 pr-4 ${
                      active ? 'bg-[#4a4f56] text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={type.data()}
                >
                  <span
                    className={`truncate flex items-center gap-2 ${
                      type.data().typeName === DataType.typeName ? 'font-semibold' : 'font-normal'
                    }`}
                  >
                    <Icon
                      icon={`simple-icons:${type.data().icon}`}
                      className="h-5 w-5 text-[#c3cedc]"
                    />
                    {type.data().typeName}
                  </span>
                  {type.data().typeName === DataType.typeName && (
                    <span className="absolute inset-y-0 left-0 flex items-center text-amber-600 pl-2">
                      <Icon icon="uil:check" className="h-6 w-6" aria-hidden="true" />
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <button
        type="button"
        onClick={() =>
          getOgImage(url).then((res) =>
            uploadPost(name, url, res, DataType).then(() => navigte('/')),
          )
        }
        className="w-full py-4 bg-[#c3cedc] text-[#2c2f33] rounded-md shadow-md font-semibold mt-4 flex items-center justify-center gap-4 hover:bg-[#b3bdc9] transition-all"
      >
        Add Resource
        <Icon icon="material-symbols:send-rounded" className="w-5 h-5 text-[#2c2f33]" />
      </button>
    </div>
  );
}

export default Upload;
