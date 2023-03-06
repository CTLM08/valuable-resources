import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

function AddResource() {
  return (
    <Link to="/upload">
      <button
        type="button"
        className="w-full bg-[#4a4f56] hover:bg-[#575d64] transition-all rounded-md relative flex items-center px-4 py-3 shadow-md"
      >
        <span className="bg-transparent w-full text-left">Add Resource</span>
        <Icon icon="material-symbols:send-rounded" className="w-5 h-5" />
      </button>
    </Link>
  );
}

export default AddResource;
