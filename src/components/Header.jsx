import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';

function Header() {
  return (
    <div>
      <div className="text-xl font-semibold">Make React Great Again</div>
      <Link to="/" className="mt-2 text-sm">
        # 🔑-valuable-resources
      </Link>
    </div>
  );
}

export default Header;
