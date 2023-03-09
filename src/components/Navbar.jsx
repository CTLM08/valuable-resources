/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import AddResource from './AddResource';

import AddType from './AddType';
import Header from './Header';
import IconSelector from './IconSelector';
import Input from './Input';
import TypeList from './TypeList';

function Navbar() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 p-8 bg-[#2c2f33] flex md:hidden w-full items-center justify-between shadow-lg gap-8">
        <Header />
        <button onClick={() => setIsOpen(true)} type="button">
          <Icon icon="uil:bars" className="h-8 w-8 text-[#c3cedc]" />
        </button>
      </div>
      <div
        className={`bg-[#2c2f33] w-full overflow-scroll z-[8787] md:overflow-hidden transition-all duration-500 p-8 md:pr-0 fixed md:relative h-screen top-0 ${
          isOpen ? 'left-0' : '-left-full md:left-0'
        } md:flex flex-col md:w-2/5 lg:w-1/3 xl:w-1/4 justify-between`}
      >
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="mt-12">
          <Input
            value={categorySearchQuery}
            setValue={setCategorySearchQuery}
            placeholder="Search categories"
            icon="uil:search"
          />
        </div>
        <div className="flex flex-1 flex-col flex-shrink overflow-scroll mb-8">
          <TypeList categorySearchQuery={categorySearchQuery} setIsOpen={setIsOpen} />
          <AddType
            selectedIcon={selectedIcon}
            setIsIconSelectorOpen={setIsIconSelectorOpen}
            setSelectedIcon={setSelectedIcon}
          />
        </div>
        <AddResource setIsOpen={setIsOpen} />
        <button
          onClick={() => setIsOpen(false)}
          type="button"
          className="absolute top-9 right-8 md:hidden"
        >
          <Icon icon="uil:multiply" className="h-6 w-6 text-[#c3cedc]" />
        </button>
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
