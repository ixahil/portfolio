"use client";

import ThemeSwitcher from "@/utils/themes/ThemeSwitcher";
import { Bell, ChevronDown } from "lucide-react";
import React from "react";
import { Avatar, User } from "@nextui-org/react";
import Link from "next/link";
import Clock from "@/utils/clock/Clock";
import UserInfo from "@/utils/userInfo/UserInfo";

type Props = {};

function Header({}: Props) {
  const now = new Date();

  return (
    <header className="flex w-full items-center border-b-2 border-light-lighter dark:border-dark-lighter shadow-lg dark:shadow-lg dark:shadow-[#27272a] px-8 pb-4">
      <div className="flex flex-col gap-4 flex-1 md:hidden">
        <div className="flex items-center gap-4 ">
          <p className="text-2xl  md:text-xl">Today's Plan</p>
          <ChevronDown />
        </div>
        <div className="clock-wrapper  md:hidden">
          {/* <Clock time={now.getTime()} /> */}
          <Clock time={now.getTime()} />
        </div>
      </div>
      <div className="md:flex-1 flex items-center">
        <ThemeSwitcher
          taglineDay={"Not a Day Dreamer?"}
          taglineNight={"Not a Night Owl?"}
        />
      </div>
      <div className="flex justify-center items-center gap-8 md:gap-2">
        <div className="border-r-2 border-light-lighter dark:border-dark-lighter px-8 md:px-2">
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
