/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import AddResource from './AddResource';

import AddType from './AddType';
import Header from './Header';
import IconSelector from './IconSelector';
import TypeList from './TypeList';

function Navbar({ isOpen, setOpen }) {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  return (
    <>
      <div className="bg-[#2c2f33] w-full overflow-scroll md:overflow-hidden p-8 fixed md:relative h-screen top-0 left-0 md:flex flex-col md:w-2/5 lg:w-1/3 xl:w-1/4 justify-between">
        <Header
          categorySearchQuery={categorySearchQuery}
          setCategorySearchQuery={setCategorySearchQuery}
        />
        <div className="flex flex-1 flex-col flex-shrink overflow-scroll">
          <TypeList categorySearchQuery={categorySearchQuery} />
          <AddType
            selectedIcon={selectedIcon}
            setIsIconSelectorOpen={setIsIconSelectorOpen}
            setSelectedIcon={setSelectedIcon}
          />
        </div>
        <AddResource />
      </div>
      <IconSelector
        isOpen={isIconSelectorOpen}
        setOpen={setIsIconSelectorOpen}
        setSelectedIcon={setSelectedIcon}
      />
    </>
  );
}

export default Navbar;
