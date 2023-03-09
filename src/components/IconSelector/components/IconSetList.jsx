/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { collections } from '@iconify/collections';
import Input from '../../Input';

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

export default function IconSetList({ setCurrentIconSet }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [iconFilterTerm, setIconFilterTerm] = useState('');

  return (
    <div className="overflow-scroll p-8 pt-0 pb-2">
      <div className="flex w-full gap-2 flex-col sm:flex-row">
        <Input
          value={searchQuery}
          setValue={setSearchQuery}
          placeholder={`Search ${ICON_COUNT.toLocaleString()} icons`}
          icon="uil:search"
        />
        <button
          type="button"
          onClick={() => {
            if (searchQuery) setCurrentIconSet({ search: searchQuery });
          }}
          className="py-4 px-6 bg-[#c3cedc] text-[#2c2f33] rounded-md shadow-md font-medium flex items-center justify-center gap-1 hover:bg-[#b3bdc9] transition-all"
        >
          Search
          <Icon icon="uil:arrow-right" className="w-5 h-5 text-[#2c2f33]" />
        </button>
      </div>
      <div className="flex items-center w-full gap-8 flex-col lg:flex-row">
        <div className="flex flex-wrap mt-4 gap-2 w-full">
          {Object.keys(ICON_SETS).map((category, index) => (
            <button
              type="button"
              onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
              className={`${
                selectedCategory === index ? 'bg-[#c3cedc] text-[#373b40] shadow-md' : ''
              } bg-[#373b40] text-[#727983] rounded-full whitespace-nowrap h-8 flex flex-grow md:flex-grow-0 transition-all items-center justify-center px-6 shadow-md text-sm`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="w-full lg:w-3/5 xl:w-1/3">
          <Input
            value={iconFilterTerm}
            setValue={setIconFilterTerm}
            placeholder="Filter icon sets"
            icon="uil:filter"
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full mt-12 overflow-scroll min-h-0">
        <div className="flex flex-col w-full">
          {Object.entries(ICON_SETS).map(
            ([category, iconSets], index) =>
              Boolean(
                (selectedCategory === null || selectedCategory === index) &&
                  iconSets.filter(
                    (iconSet) =>
                      !iconFilterTerm.trim() ||
                      iconSet.name.toLowerCase().includes(iconFilterTerm.trim().toLowerCase()),
                  ).length,
              ) && (
                <div className="w-full mb-6 overflow-hidden">
                  <div className="mb-8 rounded-lg text-center text-2xl font-medium after:w-8 after:absolute relative after:-bottom-2 after:left-1/2 after:border-b-2 after:border-b-[#c3cedc] after:-translate-x-1/2">
                    {category}
                  </div>
                  <div className="flex-wrap grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4 icon-list">
                    {iconSets.map(
                      (iconSet) =>
                        (!iconFilterTerm.trim() ||
                          iconSet.name
                            .toLowerCase()
                            .includes(iconFilterTerm.trim().toLowerCase())) && (
                          <button
                            type="button"
                            onClick={() => setCurrentIconSet({ iconSet: iconSet.prefix })}
                            className="flex flex-col sssm:flex-row flex-grow overflow-hidden w-full bg-[#373b40] rounded-md shadow-lg"
                          >
                            <div className="flex flex-col flex-shrink-0 font-medium text-stone-800 w-full sssm:w-36">
                              <div className="w-full h-full flex items-center justify-center px-4 py-6 gap-5 sssm:gap-3 ">
                                {iconSet.samples.map((sampleIcon) => (
                                  <Icon
                                    icon={`${iconSet.prefix}:${sampleIcon}`}
                                    className="w-8 h-8 flex-shrink-0"
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
                          </button>
                        ),
                    )}
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
}
