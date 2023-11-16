import React from 'react';
import Link from 'next/link';
import { LuTwitter, LuInstagram, LuMail } from 'react-icons/lu';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';

type Props = {};

const SocialIcons = (props: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-6 md:gap-1">
      <Link href={'#'} target="_blank" className="rounded-full bg-dark p-3 hover:bg-[#464141]">
        <LuTwitter size={22} cursor="pointer" color="white" fill="white" />
      </Link>
      <Link
        href={'https://www.instagram.com/imxahil/'}
        target="_blank"
        className="rounded-full bg-dark p-3 hover:bg-[#464141]"
      >
        <LuInstagram size={22} cursor="pointer" color="white" fill="" />
      </Link>
      <Link
        href={'https://www.linkedin.com/in/ixahil/'}
        target="_blank"
        className="rounded-full bg-dark p-3 hover:bg-[#464141]"
      >
        <BsLinkedin size={22} cursor="pointer" color="white" />
      </Link>
      <Link
        href={'https://github.com/ixahil'}
        target="_blank"
        className="rounded-full bg-dark p-3 hover:bg-[#464141]"
      >
        <BsGithub size={22} cursor="pointer" color="white" />
      </Link>
      <Link
        href={'mailto:sahilshaiikh@hotmail.com'}
        target="_blank"
        className="rounded-full bg-dark p-3 hover:bg-[#464141]"
      >
        <LuMail size={22} cursor="pointer" color="white" />
      </Link>
    </div>
  );
};

export default SocialIcons;
