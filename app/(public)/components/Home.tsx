import Image from "next/image";
import React from "react";
import SocialIcons from "../utils/SocialIcons";
import { Divider } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator";
import { CornerRightDown } from "lucide-react";
import TechIconsHome from "@/utils/shared/TechIconsHome";
import { Tooltip } from "@nextui-org/react";

const Home = () => {
  return (
    <section
      id="home"
      className="md:p-16 w-full h-[50%] flex justify-center pt-16 bg-[url('/images/12071161_SL-093020-35920-01.jpg')] bg-cover brightness-130 dark:brightness-100 text-text-light "
    >
      <div className="max-w-[1200px] flex justify-between gap-12 md:flex-col">
        <div className="flex flex-col gap-8 w-full">
          <div className="">
            <h1 className="md:text-3xl text-4xl __title_head dark:text-[#adacb5]">
              I am
              <span className="__title_sub_section">
                <span className="__title_sub">A Enthusiastic Developer</span>
                <span className="__title_sub">A Freelancer!</span>
                <span className="__title_sub">An Aspiring Student!</span>
              </span>
            </h1>
          </div>
          <p className="text-[#65656d] dark:text-[#adacb5] text-lg md:text-sm text-justify">
            I am a backend developer with expertise in Node.js. I have
            experience in building scalable, secure, and reliable web
            applications using various frameworks and technologies. I enjoy
            solving complex problems and learning new skills. I am passionate
            about creating high-quality code that follows best practices and
            industry standards. I am always looking for new challenges and
            opportunities to grow as a developer.
          </p>
          <SocialIcons />
          <button className="p-3 bg-[#1aa1ed] text-light hover:animate-pulse rounded-md">
            Let's Connect
          </button>
          <button className="p-3 bg-dark-darker text-light hover:animate-pulse rounded-md">
            Download Resume
          </button>
        </div>
        <div className="h-[80%] border-2 border-dark-lighter"></div>
        <div className="flex flex-col gap-8 w-full pt-12">
          <h1 className="md:text-3xl text-4xl flex items-center gap-4 dark:text-[#adacb5]">
            Technologies I used to
            <CornerRightDown />
          </h1>
          <div className="flex flex-col h-[20%] gap-4 flex-wrap md:flex-row">
            <TechIconsHome />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
