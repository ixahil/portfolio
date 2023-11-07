"use client";
import React from "react";
import { TfiLinkedin } from "react-icons/tfi";
import { SiGithub } from "react-icons/si";
import { Avatar } from "@nextui-org/react";

const About = () => {
  return (
    <section
      className="flex flex-col gap-8 w-full h-full bg-gradient-to-r from-primary to-[#2b0e30] md:p-8 md:gap-4"
      id="about"
    >
      <div className="flex w-2/3 md:w-full justify-evenly mx-auto gap-8 md:flex-col items-center md:justify-center">
        <div className="flex flex-col gap-4 py-24 md:py-0">
          <h1 className="md:text-3xl text-4xl text-text-light">Sahil Shaikh</h1>
          <h2 className="text-dark md:text-xl text-2xl">Web Developer</h2>
          <p className="text-[#c8c7c8] text-justify">
            I've worked on a variety of projects over the years and I'm proud of
            the progress I've made. Many of these projects are open-source and
            available for others to explore and contribute to. If you're
            interested in any of the projects I've worked on, please feel free
            to check out the code and suggest any improvements or enhancements
            you might have in mind. Collaborating with others is a great way to
            learn and grow, and I'm always open to new ideas and feedback.
          </p>
          <div className="flex gap-2">
            <div className="border-2 border-dark rounded-sm p-4 cursor-pointer hover:bg-transparent bg-dark">
              <TfiLinkedin fill="white" className="text-xl" />
            </div>
            <div className="border-2 border-dark rounded-sm p-4 cursor-pointer hover:bg-transparent bg-dark">
              <SiGithub fill="white" className="text-xl" />
            </div>
          </div>
        </div>
        <div className="m-auto">
          <Avatar
            isBordered
            color="primary"
            src="/images/avatar.jpg"
            className="w-60 h-60 text-large md:w-40 md:h-40"
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
