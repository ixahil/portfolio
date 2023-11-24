import SocialIcons from '@/utils/public/SocialIcons';
import { ChevronDownCircle, CornerRightDown } from 'lucide-react';
import TechIconsHome from '@/utils/Admin/shared/TechIconsHome';
import Link from 'next/link';
type Props = {
  data: {
    instagram: string;
    linkedin: string;
    git: string;
    email: string;
    resume: string;
  };
};
const Home = ({ data }: Props) => {
  const resume = process.env.NEXT_PUBLIC_BACKEND_FOLDER + data.resume;

  return (
    <section
      id="home"
      className={`bg-gradient relative flex h-full w-full justify-center pt-36 md:pt-24`}
    >
      <div className="flex w-5/6 justify-between gap-20 md:w-full md:flex-col md:gap-12 md:px-8">
        <div className="flex w-1/2 flex-col gap-8 md:w-full">
          <div className="">
            <h1 className="__title_head text-4xl font-bold md:text-2xl">
              I am
              <span className="__title_sub_section text-4xl md:text-lg">
                <span className="__title_sub">A Enthusiastic Developer</span>
                <span className="__title_sub">A Freelancer!</span>
                <span className="__title_sub">An Aspiring Student!</span>
              </span>
            </h1>
          </div>
          <p className="text-justify text-lg md:text-sm ">
            I am a backend developer with expertise in Node.js. I have experience in building
            scalable, secure, and reliable web applications using various frameworks and
            technologies. I enjoy solving complex problems and learning new skills. I am passionate
            about creating high-quality code that follows best practices and industry standards. I
            am always looking for new challenges and opportunities to grow as a developer.
          </p>
          <SocialIcons data={data} />
          <div className="flex gap-8">
            <a
              href="#contact"
              className="rounded-md border-1 border-[#1aa1ed] bg-[#1aa1ed] p-3 px-11 text-center text-light transition duration-300 ease-in-out hover:scale-105 hover:bg-transparent hover:text-dark dark:hover:text-light"
            >
              Let's Connect
            </a>
            <a
              href={resume}
              className="button rounded-md border-1 border-[#302e2e] bg-[#302e2e] p-3 px-6 text-center text-light transition duration-300 ease-in-out hover:scale-105 hover:border-[#1aa1ed] hover:bg-transparent hover:text-dark dark:hover:text-light"
            >
              Download Resume
            </a>
          </div>
        </div>
        <div className="h-full border-2 border-[#302e2e]"></div>
        <div className="flex w-1/2 flex-col gap-8 pt-12 md:w-full md:pt-0">
          <h1 className="flex flex-wrap items-center gap-4 text-4xl md:text-xl">
            Technologies I used to
            <CornerRightDown />
          </h1>
          <div className="flex flex-row flex-wrap gap-12 md:gap-1">
            <TechIconsHome />
          </div>
        </div>
      </div>
      <Link className="absolute bottom-0 right-[25%]" href={'#projects'}>
        <ChevronDownCircle size={52} fill="white" className="animate-bounce dark:fill-dark" />
      </Link>
    </section>
  );
};

export default Home;
