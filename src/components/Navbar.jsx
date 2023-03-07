/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import AddResource from './AddResource';

import AddType from './AddType';
import Header from './Header';
import TypeList from './TypeList';

function Navbar() {
  return (
    <div className=" p-8 flex flex-col w-1/4 justify-between overflow-scroll gap-8">
      <div>
        <Header />
        <div className="mt-16">
          <TypeList />
          <AddType />
        </div>
      </div>
      <AddResource />
    </div>
  );
}

export default Navbar;
