'use client';
import React from 'react';
import Containers from '../Containers';
import Link from 'next/link';
import AdminNavItem from './AdminNavItem';
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from 'react-icons/md';
import { usePathname } from 'next/navigation';

const AdminNav = () => {
  const pathname = usePathname();

  return (
    <div className=" w-full shadow-sm top-20 border-b-2 pt-4 ">
      <Containers>
        <div className=" flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathname === '/admin'}
            />
          </Link>
          <Link href="/admin/add-product">
            <AdminNavItem
              label="Add Product"
              icon={MdLibraryAdd}
              selected={pathname === '/admin/add-product'}
            />
          </Link>
          <Link href="/admin/manage-product">
            <AdminNavItem
              label="Manage Product"
              icon={MdDns}
              selected={pathname === '/admin/manage-product'}
            />
          </Link>
          <Link href="/admin/manage-order">
            <AdminNavItem
              label="Manage Order"
              icon={MdFormatListBulleted}
              selected={pathname === '/admin/manage-order'}
            />
          </Link>
        </div>
      </Containers>
    </div>
  );
};

export default AdminNav;
