'use client'
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { LayoutDashboard, Home, History, CircleUserRound, Menu } from 'lucide-react';
import { usePathname, } from 'next/navigation';
import Link from 'next/link';
import { BASE_URL } from '@/config/Constants';
import { signOut, useSession } from 'next-auth/react';
import { getEmail, setEmail } from '@/app/libs/myeail';
import { useRouter } from 'next/navigation';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const baseurl = BASE_URL;
  
  let userEmail=getEmail()
  const pathname = usePathname();
  let fullPath = baseurl + pathname;

  const handleSignOut = async () => {
    if (userEmail !== null) {
      setEmail("");
      
      await signOut({ callbackUrl: "/", redirect: false });
      window.location.reload(); // Ensure the page is reloaded after logout
    }
  };



 
  const routes = [
    {
      icon: Home,
      href: `/applicants/home`,
      label: 'Home',
      active: fullPath === `/applicants/home` ? true : false,
    },
    {
      icon: LayoutDashboard,
      href: `/applicants/dashboard`,
      label: 'Dashboard',
      active: fullPath === `/applicants/dashboard` ? true : false,
    },
    {
      icon: History,
      href: `/applicants/history`,
      label: 'History',
      active: fullPath === `/applicants/history` ? true : false,
    },
    {
      icon: CircleUserRound,
      href: `/applicants/profile`,
      label: 'Profile',
      active: fullPath === `/applicants/profile` ? true : false,
    },
  ];

  return (
    <nav className="w-full p-5 bg-white z-10 relative shadow-lg lg:p-5 md:p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-semibold">S A T</p>
        </div>
        <div className="block lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
            <Menu />
          </button>
        </div>
        <div className={clsx("lg:flex lg:ml-4 lg:space-x-4 lg:items-center", { 'hidden': !isOpen, 'flex flex-col': isOpen, 'absolute top-16 left-0 right-0 bg-white shadow-md p-5 lg:static lg:bg-transparent lg:shadow-none lg:p-0': isOpen })}>
          {routes.map((route) => (
            <Link
              key={route.label}
              href={route.href}
              className={clsx(
                'text-sm font-medium transition-colors hover:text-primary py-2 lg:py-0',
                route.active
                  ? 'text-black text-lg dark:text-white'
                  : 'text-gray-500'
              )}
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              <div className="flex items-center gap-2">
                {route.icon &&
                  React.createElement(route.icon, {
                    className: clsx(
                      'h-5 w-5',
                      route.active ? 'text-primary' : 'text-gray-500'
                    ),
                  })}
                {route.label}
              </div>
            </Link>
          ))}
          <button onClick={handleSignOut} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-2 lg:mt-0">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
export const fetchCache = 'force-no-store';
