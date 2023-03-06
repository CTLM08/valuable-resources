/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { Icon } from '@iconify/react';
import { collections } from '@iconify/collections';

import Input from '../page/Upload/components/Input';

const ICON_SETS = {
  General: [],
  'Animated Icons': [],
  'Brands / Social': [],
  Emoji: [],
  'Maps / Flags': [],
  Thematic: [],
  'Archive / Unmaintained': [],
  Other: [],
};

Object.entries(collections).forEach(([key, value]) => {
  value.prefix = key;
  ICON_SETS[value.category || 'Other'] = [...ICON_SETS[value.category || 'Other'], value];
});

const ICON_COUNT = Object.values(ICON_SETS)
  .flat()
  .map((e) => e.total)
  .reduce((a, b) => a + b);

function IconSelector({ isOpen, setOpen }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [iconFilterTerm, setIconFilterTerm] = useState('');

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
        <div className="bg-[#2c2f33] flex relative flex-col rounded-lg items-center justify-center w-full mx-4 510:mx-16 lg:w-1/2 p-8 pb-0 shadow-2xl max-h-[calc(100vh-16rem)]">
          <h1 className="flex items-center w-full gap-2 text-2xl mb-6">
            <Icon icon="material-symbols:view-cozy-outline-rounded" className="w-8 h-8" />
            Select Icon
          </h1>
          <Input
            value={searchQuery}
            setValue={setSearchQuery}
            placeholder={`Search ${ICON_COUNT.toLocaleString()} icons`}
            icon="uil:search"
          />
          <div className="flex flex-wrap mt-4 gap-2 w-full">
            {Object.keys(ICON_SETS).map((category, index) => (
              <button
                type="button"
                onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
                className="{selectedCategory === index
          ? ``
          : ``} bg-[#373b40] text-[#727983] rounded-full whitespace-nowrap h-8 flex flex-grow md:flex-grow-0 transition-all items-center justify-center px-6 shadow-md text-sm"
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center w-full mt-8 overflow-scroll min-h-0">
            <div className="flex flex-col w-full">
              {Object.entries(ICON_SETS).map(
                ([name, iconSets], index) =>
                  (selectedCategory === null || selectedCategory === index) &&
                  iconSets.filter(
                    (iconSet) =>
                      !iconFilterTerm.trim() ||
                      iconSet.name.toLowerCase().includes(iconFilterTerm.trim().toLowerCase()),
                  ).length && (
                    <div className="w-full mb-6 overflow-hidden">
                      <div className="mb-8 rounded-lg text-2xl font-medium after:w-8 after:absolute relative after:-bottom-2 after:left-1/2 after:border-b-2 after:border-b-[#c3cedc] after:-translate-x-1/2">
                        {name}
                      </div>
                      <div className="flex-wrap grid grid-cols-3 gap-4 icon-list">
                        {iconSets.map(
                          (iconSet) =>
                            (!iconFilterTerm.trim() ||
                              iconSet.name
                                .toLowerCase()
                                .includes(iconFilterTerm.trim().toLowerCase())) && (
                              <div className="flex flex-col sssm:flex-row flex-grow overflow-hidden w-full bg-[#373b40] rounded-md shadow-lg">
                                <div className="flex flex-col flex-shrink-0 font-medium text-stone-800 w-full sssm:w-36">
                                  <div className="w-full h-full flex items-center justify-center px-4 py-6 gap-5 sssm:gap-3 ">
                                    {iconSet.samples.map((sampleIcon) => (
                                      <Icon
                                        icon={`${iconSet.prefix}:${sampleIcon}`}
                                        class="w-8 h-8 flex-shrink-0"
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="flex flex-col justify-between px-4 pb-3 w-full text-left">
                                  <a
                                    href="./icon-set/{iconSet.prefix}"
                                    className="whitespace-nowrap overflow-ellipsis overflow-hidden font-medium"
                                  >
                                    {iconSet.name}
                                  </a>
                                  <p className="mt-1 overflow-hidden whitespace-nowrap overflow-ellipsis text-xs">
                                    By&nbsp;
                                    <a
                                      target="_blank"
                                      href={iconSet.author.url || '/'}
                                      className="underline"
                                      rel="noreferrer"
                                    >
                                      {iconSet.author.name}
                                    </a>
                                  </p>
                                  <div className="w-full flex mt-4 pt-4 border-t border-[#727983] sssm:py-0 justify-between items-center text-sm">
                                    <p>{iconSet.total} icons</p>
                                    {iconSet.height && (
                                      <div className="flex items-center">
                                        <Icon
                                          icon="icon-park-outline:auto-height-one"
                                          width="20"
                                          height="20"
                                        />
                                        <p className="ml-1">{iconSet.height}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ),
                        )}
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IconSelector;
