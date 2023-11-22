'use client';
import React from 'react';
import { TfiLinkedin } from 'react-icons/tfi';
import { SiGithub } from 'react-icons/si';
import { Avatar } from '@nextui-org/react';
import Link from 'next/link';

type Props = {
  data: {
    instagram: string;
    linkedin: string;
    git: string;
    email: string;
    resume: string;
    name: string;
    position: string;
  };
};

const About = ({ data }: Props) => {
  return (
    <section
      className="flex h-full w-full flex-col gap-8 bg-gradient-to-r from-primary to-[#2b0e30] md:gap-4 md:p-8"
      id="about"
    >
      <div className="mx-auto flex w-5/6 items-center justify-evenly gap-8 md:w-full md:flex-col md:justify-center">
        <div className="flex flex-col gap-4 py-24 md:py-0">
          <h1 className="text-4xl text-text-light md:text-3xl">{data.name}</h1>
          <h2 className="text-2xl text-dark md:text-xl">{data.position}</h2>
          <p className="text-justify text-[#c8c7c8]">
            I've worked on a variety of projects over the years and I'm proud of the progress I've
            made. Many of these projects are open-source and available for others to explore and
            contribute to. If you're interested in any of the projects I've worked on, please feel
            free to check out the code and suggest any improvements or enhancements you might have
            in mind. Collaborating with others is a great way to learn and grow, and I'm always open
            to new ideas and feedback.
          </p>
          <div className="flex gap-2">
            <Link href={data.linkedin}>
              <div className="cursor-pointer rounded-sm border-2 border-dark bg-dark p-4 hover:bg-transparent">
                <TfiLinkedin fill="white" className="text-xl" />
              </div>
            </Link>
            <Link href={data.git}>
              <div className="cursor-pointer rounded-sm border-2 border-dark bg-dark p-4 hover:bg-transparent">
                <SiGithub fill="white" className="text-xl" />
              </div>
            </Link>
          </div>
        </div>
        <div className="m-auto">
          <Avatar
            isBordered
            color="primary"
            src="/images/avatar.jpg"
            className="h-60 w-60 text-large md:h-40 md:w-40"
          />
        </div>
      </div>
      {/* <div className="flex items-center flex-col">
        <h2 className="md:text-3xl text-5xl">
          About <span className="leading-[24px] text-[#1aa1ed]">Me</span>
        </h2>
      </div>
      <div className="flex justify-evenly py-8 md:flex-col md:gap-8 md:p-4">
        <div className="flex gap-8 flex-col ">
          <div className="w-[70%] text-justify md:w-full">
            <h1 className="text-3xl  text-justify md:w-full">
              I’m Sahil S. I live in Surat, Gujarat, where I design the future.
            </h1>
          </div>
          <p className="text-[#65656d] text-xl w-[70%] text-justify md:w-full md:text-sm">
            I've worked on a variety of projects over the years and I'm proud of
            the progress I've made. Many of these projects are open-source and
            available for others to explore and contribute to. If you're
            interested in any of the projects I've worked on, please feel free
            to check out the code and suggest any improvements or enhancements
            you might have in mind. Collaborating with others is a great way to
            learn and grow, and I'm always open to new ideas and feedback.
          </p>
          <SocialIcons />
        </div>
        <div className="md:self-center">
          <div className="h-[370px] w-[370px] rotate-3">
            <Image
              src="/images/about.jpg"
              className="w-[100%] h-[100%] max-w-none overflow-clip rounded-[10%]"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default About;
