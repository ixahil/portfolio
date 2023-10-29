import Image from "next/image";
import React from "react";
import SocialIcons from "@/utils/public/SocialIcons";
import { ChevronDownCircle, CornerRightDown } from "lucide-react";
import TechIconsHome from "@/utils/Admin/shared/TechIconsHome";
import Link from "next/link";

const Home = () => {
  return (
    <section
      id="home"
      className={`md:p-8 w-full h-full py-14 flex justify-center relative bg-gradient dark:bg-gradient-dark`}
    >
      {/* <Image
        src="/images/12071161_SL-093020-35920-01.jpg"
        priority
        alt="header-bg"
        quality={100}
        fill
        sizes="100vw"
        objectFit="cover"
        className="z-[-1]"
      /> */}
      <div className="max-w-[1200px] flex gap-56 md:flex-col md:gap-12 justify-between">
        <div className="flex flex-col gap-8 w-1/2 text-black md:w-full">
          <div className="">
            <h1 className="md:text-2xl text-4xl __title_head font-bold">
              I am
              <span className="__title_sub_section md:text-lg">
                <span className="__title_sub">A Enthusiastic Developer</span>
                <span className="__title_sub">A Freelancer!</span>
                <span className="__title_sub">An Aspiring Student!</span>
              </span>
            </h1>
          </div>
          <p className="text-lg md:text-sm text-justify ">
            I am a backend developer with expertise in Node.js. I have
            experience in building scalable, secure, and reliable web
            applications using various frameworks and technologies. I enjoy
            solving complex problems and learning new skills. I am passionate
            about creating high-quality code that follows best practices and
            industry standards. I am always looking for new challenges and
            opportunities to grow as a developer.
          </p>
          <SocialIcons />
          <button className="p-3 bg-[#1aa1ed] text-light hover:bg-transparent border-1 border-[#1aa1ed] rounded-md">
            Let's Connect
          </button>
          <button className="p-3 bg-[#302e2e] text-light hover:bg-transparent  border-1 border-[#302e2e] hover:border-[#1aa1ed] rounded-md">
            Download Resume
          </button>
        </div>
        {/* <div className="h-[80%] border-2 border-dark-lighter"></div> */}
        <div className="flex flex-col gap-8 w-1/2 md:w-full pt-12  text-light">
          <h1 className="md:text-xl text-4xl flex items-center gap-4 flex-wrap">
            Technologies I used to
            <CornerRightDown />
          </h1>
          <div className="flex flex-row gap-12 md:gap-1 flex-wrap">
            <TechIconsHome />
          </div>
        </div>
      </div>
      <Link className="absolute bottom-5 right-16" href={"#projects"}>
        <ChevronDownCircle size={62} fill="white" className="animate-bounce" />
      </Link>
    </section>
  );
};

export default Home;
