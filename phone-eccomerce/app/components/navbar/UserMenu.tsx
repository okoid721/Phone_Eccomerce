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
        <div onClick={toggleOpen}>
          <Avatar />
          <AiFillCaretDown />
        </div>
      </div>
    </>
  );
};

export default UserMenu;
