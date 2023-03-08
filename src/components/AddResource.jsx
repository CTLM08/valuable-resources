import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

function AddResource({ setIsOpen }) {
  return (
    <Link
      to="/upload"
      onClick={() => setIsOpen(false)}
      className="w-full bg-[#4a4f56] hover:bg-[#575d64] transition-all rounded-md relative flex items-center px-4 py-3 shadow-md"
    >
      <span className="bg-transparent w-full text-left">Add Resource</span>
      <Icon icon="material-symbols:send-rounded" className="w-5 h-5" />
    </Link>
  );
}

export default AddResource;
