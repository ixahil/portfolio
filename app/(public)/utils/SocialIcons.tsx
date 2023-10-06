import React from "react";
import Link from "next/link";
import { LuTwitter, LuInstagram, LuMail } from "react-icons/lu";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";

type Props = {};

const SocialIcons = (props: Props) => {
  return (
    <div className="flex gap-6 items-center">
      <Link
        href={"#"}
        target="_blank"
        className="p-3 bg-[#000] rounded-full hover:bg-[#464141]"
      >
        <LuTwitter size={22} cursor="pointer" color="white" fill="white" />
      </Link>
      <Link
        href={"#"}
        target="_blank"
        className="p-3 bg-[#000] rounded-full hover:bg-[#464141]"
      >
        <LuInstagram size={22} cursor="pointer" color="white" fill="" />
      </Link>
      <Link
        href={"#"}
        target="_blank"
        className="p-3 bg-[#000] rounded-full hover:bg-[#464141]"
      >
        <BsLinkedin size={22} cursor="pointer" color="white" />
      </Link>
      <Link
        href={"#"}
        target="_blank"
        className="p-3 bg-[#000] rounded-full hover:bg-[#464141]"
      >
        <BsGithub size={22} cursor="pointer" color="white" />
      </Link>
      <Link
        href={"#"}
        target="_blank"
        className="p-3 bg-[#000] rounded-full hover:bg-[#464141]"
      >
        <LuMail size={22} cursor="pointer" color="white" />
      </Link>
    </div>
  );
};

export default SocialIcons;
