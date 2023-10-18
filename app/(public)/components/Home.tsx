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
      className="w-full h-[50%] flex justify-center pt-16 dark:bg-black bg-[url('/images/12071161_SL-093020-35920-01.jpg')] bg-cover bg-brightness-150 "
    >
      <div className="w-[1200px] flex justify-between gap-12">
        <div className="flex flex-col gap-8 w-full">
          <div className="">
            <h1 className="md:text-3xl text-4xl __title_head">
              I am
              <span className="__title_sub_section">
                <span className="__title_sub">A Enthusiastic Developer</span>
                <span className="__title_sub">A Freelancer!</span>
                <span className="__title_sub">An Aspiring Student!</span>
              </span>
            </h1>
          </div>
          <p className="text-[#65656d] text-lg md:text-sm text-justify">
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
          <h1 className="md:text-3xl text-4xl flex items-center gap-4">
            Technologies I used to
            <CornerRightDown />
          </h1>
          <div className="flex flex-col h-[20%] gap-4 flex-wrap">
            <TechIconsHome />
          </div>
        </div>
      </div>

      {/* <div className=" rounded-[10%] rotate-3 max-md:self-center">
        <Image
          src={"/images/homepage.jpg"}
          alt=""
          width={100}
          height={100}
          sizes="100vw"
          style={{
            width: "auto",
            height: "300px",
          }}
          className="max-w-none overflow-clip rounded-[10%]"
          blurDataURL="data:..."
          placeholder="blur" // Optional blur-up while loading
        />
      </div> */}
    </section>
  );
};

export default Home;
