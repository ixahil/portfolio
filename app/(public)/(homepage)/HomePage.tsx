import React from "react";
import Image from "next/image";
import SocialIcons from "../utils/SocialIcons";
import Projects from "../components/Projects";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-evenly py-8 mx-auto md:w-full gap-8">
        <div className="flex flex-col gap-8 w-full md:w-[70%]">
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl __title_head">
              I am a
              <span className="__title_sub_section">
                <span className="__title_sub">Full-Stack Developer!</span>
                <span className="__title_sub">A Freelancer!</span>
                <span className="__title_sub">An Aspiring Student!</span>
              </span>
            </h1>
          </div>
          <p className="text-[#65656d] text-lg md:text-sm lg:text-xl xl:text-xl w-full text-justify">
            I am a backend developer with expertise in Node.js. I have
            experience in building scalable, secure, and reliable web
            applications using various frameworks and technologies. I enjoy
            solving complex problems and learning new skills. I am passionate
            about creating high-quality code that follows best practices and
            industry standards. I am always looking for new challenges and
            opportunities to grow as a developer.
          </p>
          <SocialIcons />
        </div>

        <div className=" rounded-[10%] rotate-3 max-md:self-center">
          <Image
            src={"/images/homepage.jpg"}
            alt=""
            width={370}
            height={370}
            className="max-w-none overflow-clip rounded-[10%]"
          />
        </div>
      </div>
      <Projects />
    </>
  );
};

export default page;
