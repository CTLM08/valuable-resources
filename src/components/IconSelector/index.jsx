/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { Icon } from '@iconify/react';
import { collections } from '@iconify/collections';

import IconSetList from './components/IconSetList';
import IconSet from './components/IconSet';
import Search from './components/Search';

function IconSelector({ isOpen, setOpen, setSelectedIcon }) {
  const [currentIconSet, setCurrentIconSet] = useState(null);

  return (
    <div
      className={`w-full h-screen bg-neutral-900 transition-colors duration-500 absolute top-0 left-0 ${
        isOpen ? 'bg-opacity-50 z-50' : 'bg-opacity-0 z-[-1]'
      }`}
    >
      <div
        className={`flex items-center justify-center w-full h-screen absolute top-0 left-0 transition-all duration-500 ${
          isOpen ? 'translate-y-0' : 'translate-y-[110%]'
        }`}
      >
        <div className="bg-[#2c2f33] flex relative flex-col rounded-lg items-center justify-center w-full mx-4 510:mx-16 lg:w-3/4 p-8 pb-0 shadow-2xl max-h-[calc(100vh-8rem)]">
          <div className="flex items-center justify-between w-full mb-6">
            {currentIconSet ? (
              <button
                onClick={() => setCurrentIconSet(null)}
                type="button"
                className="flex items-center gap-2 text-lg"
              >
                <Icon icon="uil:arrow-left" className="w-7 h-7" />
                Go Back
              </button>
            ) : (
              <h1 className="flex items-center w-full gap-3 text-2xl font-medium">
                <Icon icon="material-symbols:view-cozy-outline-rounded" className="w-8 h-8" />
                Select Icon
              </h1>
            )}
            <p className="text-right flex-shrink-0">
              Powered by&nbsp;
              <a
                target="_blank"
                href="https://iconify.thecodeblog.net"
                className="underline"
                rel="noreferrer"
              >
                Iconify
              </a>
            </p>
          </div>
          {currentIconSet ? (
            currentIconSet.search ? (
              <Search
                searchTerm={currentIconSet.search}
                setCurrentIconSet={setCurrentIconSet}
                setSelectedIcon={setSelectedIcon}
                setOpen={setOpen}
              />
            ) : (
              <IconSet
                iconSet={currentIconSet.iconSet}
                setSelectedIcon={setSelectedIcon}
                setOpen={setOpen}
              />
            )
          ) : (
            <IconSetList setCurrentIconSet={setCurrentIconSet} />
          )}
        </div>
      </div>
    </div>
  );
}

export default IconSelector;
