/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React from 'react';

function Input({ value, setValue, placeholder, icon }) {
  return (
    <div className="flex items-center gap-3 px-5 w-full bg-[#373b40] rounded-md shadow-md">
      <Icon icon={icon} className="h-5 w-5 text-[#c3cedc]" />
      <input
        type="text"
        className="outline-none w-full py-4 bg-transparent placeholder-[#727983] text-[#afbac7]"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default Input;
