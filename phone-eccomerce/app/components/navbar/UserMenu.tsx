'use client';

import React, { useCallback, useState } from 'react';
import Avatar from '../Avatar';
import { FaCaretDown } from 'react-icons/fa6';
import Link from 'next/link';
import MenuItem from './MenuItem';
import { signOut } from 'next-auth/react';
import BackDrop from './BackDrop';
import { useCart } from '@/app/hooks/useCart';
import { SafeUser } from '@/types';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handlesetIsLoggedIn, isLoggedIn } = useCart();
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const fullName = currentUser?.name;
  const firstName = fullName?.split(' ')[0];

  return (
    <>
      <div className="relative z-30 bg-[#F9A024] rounded-full cursor-pointer">
        <div
          className="flex flex-row items-center justify-center px-4 p-3 gap-1 hover:shadow-md transition"
          onClick={toggleOpen}
        >
          {currentUser && <p>Hi, {firstName}</p>}
          <Avatar src={currentUser?.image} />
          <FaCaretDown className="text-[#fff]" />
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white text-black overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                <Link href={'/orders'}>
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                <Link href={'/admin'}>
                  <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                </Link>
                <hr />
                {/* {isLoggedIn && ( */}
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Log out
                </MenuItem>
                {/* )} */}
              </div>
            ) : (
              <div>
                <Link href={'/login'}>
                  <MenuItem onClick={toggleOpen}>Log in</MenuItem>
                </Link>
                <Link href={'/register'}>
                  <MenuItem onClick={toggleOpen}>Create an account</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
