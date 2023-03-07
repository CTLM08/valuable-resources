/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import Input from '../../Input';

async function getIconSet(searchTerm) {
  try {
    const res = await fetch(
      `https://cors-anywhere.thecodeblog.net/api.iconify.design/search?query=${searchTerm}&limit=9999`,
    );
    const data = await res.json();
    let iconList = [];
    if (data.icons.length) {
      iconList = data.icons;
    } else {
      iconList = [];
    }
    const iconSets = data.collections;

    return {
      iconList,
      iconSets,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

function Search({
  setOpen,
  searchTerm,
  setSelectedIcon,
  setCurrentIconSet: setCurrentIconSetProp,
}) {
  const [currentIconSet, setCurrentIconSet] = useState(null);
  const [iconData, setIconData] = useState(null);
  const [filteredIconList, setFilteredIconList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchTerm || '');

  useEffect(() => {
    setIconData(null);
    getIconSet(searchTerm).then((data) => {
      setIconData(data);
      setFilteredIconList(data.iconList);
      setCurrentIconSet(null);
    });
  }, [searchTerm]);

  useEffect(() => {
    if (iconData) {
      setFilteredIconList(
        currentIconSet
          ? iconData.iconList.filter((e) => e.split(':').shift() === currentIconSet)
          : iconData.iconList,
      );
    }
  }, [currentIconSet, iconData]);

  return iconData ? (
    <div className="flex w-full flex-col min-h-0">
      <div className="flex w-full gap-2">
        <Input
          value={searchQuery}
          setValue={setSearchQuery}
          placeholder="Search icons"
          icon="uil:search"
        />
        <button
          type="button"
          onClick={() => {
            if (searchQuery) setCurrentIconSetProp({ search: searchQuery });
          }}
          className="py-4 px-6 bg-[#c3cedc] text-[#2c2f33] rounded-md shadow-md font-medium flex items-center justify-center gap-1 hover:bg-[#b3bdc9] transition-all"
        >
          Search
          <Icon icon="uil:arrow-right" className="w-5 h-5 text-[#2c2f33]" />
        </button>
      </div>
      {Object.keys(iconData.iconSets).length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {Object.entries(iconData.iconSets)
            .sort()
            .map(([name, iconSet]) => (
              <button
                type="button"
                onClick={() => setCurrentIconSet(currentIconSet === name ? null : name)}
                className={`${
                  currentIconSet === name ? 'bg-[#c3cedc] text-[#373b40] shadow-md' : ''
                } bg-[#373b40] text-[#727983] rounded-full whitespace-nowrap h-8 flex flex-grow md:flex-grow-0 transition-all items-center justify-center px-6 shadow-md text-sm`}
              >
                {iconSet.name}
              </button>
            ))}
        </div>
      )}
      <div className=" pb-8 grid gap-3 mt-8 grid-cols-[repeat(auto-fill,minmax(120px,1fr))] overflow-scroll min-h-0">
        {filteredIconList.map((icon) => (
          <button
            type="button"
            onClick={() => {
              setSelectedIcon(icon.name || icon);
              setOpen(false);
            }}
            className="flex flex-col items-center cursor-pointer transition-all hover:bg-[#373b40] p-4 rounded-lg"
          >
            <Icon icon={icon.name || icon} width="32" height="32" />
            <p className="font-medium tracking-wide text-center  mt-4 -mb-0.5 text-xs break-all">
              {(icon.name || icon).replace(/-/g, ' ')}
            </p>
          </button>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex w-full justify-center pb-8">
      <Icon icon="svg-spinners:270-ring" className="w-8 h-8" />
    </div>
  );
}

export default Search;
