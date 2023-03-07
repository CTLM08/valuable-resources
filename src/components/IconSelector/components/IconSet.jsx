/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import Input from '../../Input';

async function getIconSet(iconSet) {
  try {
    const res = await fetch(
      `https://cors-anywhere.thecodeblog.net/icon-sets.iconify.design/assets/collection.${iconSet}.js`,
    );
    let data = await res.text();
    data = JSON.parse(data.match(/=(.+);/)[1]);
    const iconlist = data.icons;
    const version = data.info.version || '1.0.0';
    const { name } = data.info;
    const iconCount = data.info.total;
    const tags = data.tags || [];

    return {
      iconlist,
      version,
      name,
      iconCount,
      tags,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

function IconSet({ setOpen, iconSet, setSelectedIcon }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTag, setCurrentTag] = useState(null);
  const [iconData, setIconData] = useState(null);
  const [filteredIconList, setFilteredIconList] = useState([]);

  useEffect(() => {
    getIconSet(iconSet).then((data) => {
      setIconData(data);
      setFilteredIconList(data.iconlist);
    });
  }, []);

  useEffect(() => {
    if (iconData) {
      setFilteredIconList(
        iconData.iconlist.filter(
          (icon) =>
            (icon.name || icon).toLowerCase().includes(searchTerm.toLowerCase()) &&
            (currentTag ? icon.tags.includes(currentTag) : true),
        ),
      );
    }
  }, [searchTerm, currentTag, iconData]);

  return iconData ? (
    <div className="flex w-full flex-col min-h-0">
      <h1 className="mb-6 text-3xl font-semibold tracking-wide text-center flex flex-col items-center gap-1 sm:inline">
        {iconData.name}
        <span className="sm:ml-2 text-base">v{iconData.version}</span>
      </h1>
      <Input
        value={searchTerm}
        setValue={setSearchTerm}
        placeholder={`Search ${iconData.iconCount.toLocaleString()} icons`}
        icon="uil:search"
      />
      {iconData.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {iconData.tags.sort().map(
            (tag) =>
              tag && (
                <button
                  type="button"
                  onClick={() => setCurrentTag(currentTag === tag ? null : tag)}
                  className={`${
                    currentTag === tag ? 'bg-[#c3cedc] text-[#373b40] shadow-md' : ''
                  } bg-[#373b40] text-[#727983] rounded-full whitespace-nowrap h-8 flex flex-grow md:flex-grow-0 transition-all items-center justify-center px-6 shadow-md text-sm`}
                >
                  {tag}
                </button>
              ),
          )}
        </div>
      )}
      <div className="w-full pb-8 grid gap-3 mt-8 grid-cols-[repeat(auto-fill,minmax(120px,1fr))] overflow-scroll min-h-0">
        {filteredIconList.map((icon) => (
          <button
            type="button"
            onClick={() => {
              setSelectedIcon(`${iconSet}:${icon.name || icon}`);
              setOpen(false);
            }}
            className="flex flex-col items-center cursor-pointer transition-all hover:bg-[#373b40] p-4 rounded-lg"
          >
            <Icon icon={`${iconSet}:${icon.name || icon}`} width="32" height="32" />
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

export default IconSet;
