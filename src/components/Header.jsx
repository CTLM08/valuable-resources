import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';

function Header({ categorySearchQuery, setCategorySearchQuery }) {
  return (
    <div>
      <div className="text-xl font-semibold">Make React Great Again</div>
      <Link to="/" className="mt-4 mb-12 block">
        # 🔑-valuable-resources
      </Link>
      <Input
        value={categorySearchQuery}
        setValue={setCategorySearchQuery}
        placeholder="Search categories"
        icon="uil:search"
      />
    </div>
  );
}

export default Header;
