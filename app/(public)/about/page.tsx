import React from "react";
import about from "../../../public/images/about.jpg";
import Image from "next/image";
import SocialIcons from "../utils/SocialIcons";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex justify-evenly py-8 max-md:flex-col max-md:gap-8 ">
      <div className="flex gap-8 flex-col ">
        <div className="w-[70%] text-justify max-md:w-[100%]">
          <h1 className="text-3xl  text-justify">
            I’m Sahil S. I live in Surat, Gujarat, where I design the future.
          </h1>
        </div>
        <p className="text-[#65656d] text-xl w-[70%] text-justify max-md:w-[100%]">
          I've worked on a variety of projects over the years and I'm proud of
          the progress I've made. Many of these projects are open-source and
          available for others to explore and contribute to. If you're
          interested in any of the projects I've worked on, please feel free to
          check out the code and suggest any improvements or enhancements you
          might have in mind. Collaborating with others is a great way to learn
          and grow, and I'm always open to new ideas and feedback.
        </p>
        <SocialIcons />
      </div>
      <div className="max-md:self-center">
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
    </div>
  );
};

export default page;
