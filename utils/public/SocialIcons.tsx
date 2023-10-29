import React from "react";
import Link from "next/link";
import { LuTwitter, LuInstagram, LuMail } from "react-icons/lu";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";

type Props = {};

const SocialIcons = (props: Props) => {
  return (
    <div className="flex gap-6 items-center md:gap-1 flex-wrap">
      <Link
        href={"#"}
        target="_blank"
        className="p-3 bg-dark rounded-full hover:bg-[#464141]"
      >
        <LuTwitter size={22} cursor="pointer" color="white" fill="white" />
      </Link>
      <Link
        href={"https://www.instagram.com/imxahil/"}
        target="_blank"
        className="p-3 bg-dark rounded-full hover:bg-[#464141]"
      >
        <LuInstagram size={22} cursor="pointer" color="white" fill="" />
      </Link>
      <Link
        href={"https://www.linkedin.com/in/xahilshaikh/"}
        target="_blank"
        className="p-3 bg-dark rounded-full hover:bg-[#464141]"
      >
        <BsLinkedin size={22} cursor="pointer" color="white" />
      </Link>
      <Link
        href={"https://github.com/ixahil"}
        target="_blank"
        className="p-3 bg-dark rounded-full hover:bg-[#464141]"
      >
        <BsGithub size={22} cursor="pointer" color="white" />
      </Link>
      <Link
        href={"mailto:sahilshaiikh@hotmail.com"}
        target="_blank"
        className="p-3 bg-dark rounded-full hover:bg-[#464141]"
      >
        <LuMail size={22} cursor="pointer" color="white" />
      </Link>
    </div>
  );
};

export default SocialIcons;
