'use client';

import ThemeSwitcher from '@/utils/Admin/themes/ThemeSwitcher';
import { Bell, ChevronDown } from 'lucide-react';
import React from 'react';
import { Avatar, User } from '@nextui-org/react';
import Link from 'next/link';
import UserInfo from '@/utils/Admin/userInfo/UserInfo';

type Props = {};

function Header({}: Props) {
  const now = new Date().toDateString();

  return (
    <header className="flex w-full items-center border-b-2 border-light-lighter px-8 pb-4 shadow-lg dark:border-dark-lighter dark:shadow-lg dark:shadow-[#27272a]">
      <div className="flex flex-1 flex-col gap-4 md:hidden">
        <div className="flex items-center gap-4 ">
          <p className="text-2xl  md:text-xl">Today's Plan</p>
          <ChevronDown />
        </div>
        <div className="clock-wrapper  md:hidden">
          {/* <Clock time={now.getTime()} /> */}
          {/* <Clock time={now.getTime()} /> */}
          {now}
        </div>
      </div>
      <div className="flex items-center md:flex-1">
        <ThemeSwitcher taglineDay={'Not a Day Dreamer?'} taglineNight={'Not a Night Owl?'} />
      </div>
      <div className="flex items-center justify-center gap-8 md:gap-2">
        <div className="border-r-2 border-light-lighter px-8 dark:border-dark-lighter md:px-2">
          <Bell />
        </div>

        <div className="flex items-center gap-4">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}

export default Header;
