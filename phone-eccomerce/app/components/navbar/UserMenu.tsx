'use client';

import { useCallback, useState } from 'react';
import Avatar from '../Avatar';
import { AiFillCaretDown } from 'react-icons/ai';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className=" relative z-30">
        <div
          onClick={toggleOpen}
          className=" p-2 border-[1px] border-slate-500 flex flex-row items-center gap-1  "
        >
          <Avatar />
          <AiFillCaretDown />
        </div>
      </div>
    </>
  );
};

export default UserMenu;
