import React from 'react';
import Link from 'next/link';
import { LuTwitter, LuInstagram, LuMail } from 'react-icons/lu';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

type Props = {
  data: {
    instagram: string;
    linkedin: string;
    git: string;
    email: string;
  };
};

const SocialIcons = ({ data }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-6 md:gap-1">
      <Link
        href={'#'}
        target="_blank"
        className="rounded-full bg-dark p-3 transition duration-300 ease-in-out hover:scale-110 hover:bg-[#464141]"
      >
        <LuTwitter size={22} cursor="pointer" color="white" fill="white" />
      </Link>
      <Link
        href={data.instagram}
        target="_blank"
        className="rounded-full bg-dark p-3 transition duration-300 ease-in-out hover:scale-110 hover:bg-[#464141]"
      >
        <LuInstagram size={22} cursor="pointer" color="white" fill="" />
      </Link>
      <Link
        href={data.linkedin}
        target="_blank"
        className="rounded-full bg-dark p-3 transition duration-300 ease-in-out hover:scale-110 hover:bg-[#464141]"
      >
        <BsLinkedin size={22} cursor="pointer" color="white" />
      </Link>
      <Link
        href={data.git}
        target="_blank"
        className="rounded-full bg-dark p-3 transition duration-300 ease-in-out hover:scale-110 hover:bg-[#464141]"
      >
        <BsGithub size={22} cursor="pointer" color="white" />
      </Link>
      <Link
        href={`mailto:${data.email}`}
        target="_blank"
        className="rounded-full bg-dark p-3 transition duration-300 ease-in-out hover:scale-110 hover:bg-[#464141]"
      >
        <LuMail size={22} cursor="pointer" color="white" />
      </Link>
    </div>
  );
};

export default SocialIcons;
