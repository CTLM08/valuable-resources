/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { addTypeInDB } from '../firebase';
import IconSelector from './IconSelector';

export default function AddType() {
  const [isAddTypeOpen, setIsAddTypeOpen] = useState(false);
  const [addType, setAddType] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);

  return (
    <div className="mt-4 w-full">
      <div className="w-full">
        <button
          type="button"
          onClick={() => setIsAddTypeOpen(!isAddTypeOpen)}
          className=" mb-4 w-full justify-center bg-[#4a4f56] hover:bg-[#575d64] transition-all rounded-md relative flex items-center px-4 py-3 shadow-md cursor-pointer"
        >
          + Add
        </button>
        {isAddTypeOpen && (
          <div className="menu p-3 bg-[#373b40] rounded-lg shadow-md w-full">
            <div className="flex items-center gap-3 px-5 w-full bg-[#4a4f56] rounded-md shadow-md">
              <Icon icon="uil:tag-alt" className="h-5 w-5 text-[#c3cedc]" />
              <input
                type="text"
                className="outline-none w-full py-4 bg-transparent placeholder-[#727983] text-[#afbac7]"
                placeholder="Type name"
                value={addType}
                onChange={(e) => setAddType(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setIsIconSelectorOpen(true);
              }}
              className={`w-full py-4 bg-[#4a4f56] ${
                selectedIcon ? 'text-[#c3cedc]' : 'text-[#727983]'
              } rounded-md shadow-md text-left font-semibold mt-4 px-5 flex items-center justify-start gap-3 hover:bg-[#575d64] transition-all`}
            >
              <Icon
                icon={selectedIcon || 'material-symbols:view-cozy-outline-rounded'}
                className="w-5 h-5 flex-shrink-0"
              />
              {selectedIcon || 'Select Icon'}
            </button>
            <button
              type="button"
              onClick={() => {
                if (addType && selectedIcon) {
                  addTypeInDB(addType, selectedIcon);
                  setAddType('');
                  setSelectedIcon(null);
                }
              }}
              className="w-full py-4 bg-[#c3cedc] text-[#2c2f33] rounded-md shadow-md font-semibold mt-4 flex items-center justify-center gap-2 hover:bg-[#b3bdc9] transition-all"
            >
              <Icon icon="material-symbols:add-rounded" className="w-5 h-5 text-[#2c2f33]" />
              Add
            </button>
          </div>
        )}
      </div>
      <IconSelector
        isOpen={isIconSelectorOpen}
        setOpen={setIsIconSelectorOpen}
        setSelectedIcon={setSelectedIcon}
      />
    </div>
  );
}
