import Link from "next/link";
import { getAllProjects } from "@/utils/public/api/GetData";
import TechStackIcon from "./landingPage/TechStackIcons";
import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";
import Loading from "@/app/loading";
import { ArrowUpRightFromCircle, GithubIcon } from "lucide-react";

async function projects() {
  setTimeout(() => {}, 20000);
  const data = (await getAllProjects()) || [];
  const skeleton =
    "w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700";

  if (!data) {
    return <p>No Projects available.</p>;
  } else {
    return (
      <section className="py-36 md:py-24 md:px-8 w-full" id="projects">
        <div className="w-2/3 md:w-full mx-auto flex flex-col gap-24">
          <div className="text-center flex items-center flex-col justify-center">
            <h2 className="text-primary md:text-2xl text-3xl font-bold leading-12 tracking-[2rem] md:tracking-widest">
              FEATURED
            </h2>
            <h2 className="md:text-3xl text-5xl">
              Sneak peek from the latest{" "}
              <span className="leading-[24px] text-primary">Projects</span>
            </h2>
          </div>

          <div className="flex flex-col gap-24 md:p-0 rounded-md">
            {data.map((project: any, index: number) => {
              const sliderImages = project.images || [];

              return (
                <div
                  className="flex gap-24 md:gap-16 flex-row md:flex-col md:items-start"
                  key={index}
                >
                  <div className="relative w-2/4 md:w-full md:h-[250px]">
                    {sliderImages.length > 0 ? (
                      <>
                        <div className="absolute w-2/3 h-1/2">
                          <Image
                            className="relative h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105 rounded-lg border-1 dark:border-dark-lighter"
                            alt={project.title}
                            src={project.images[0].imageURL}
                            blurDataURL={project.images[0].imageURL}
                            placeholder="blur"
                            fill
                            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw"
                          />
                        </div>
                        {sliderImages.length > 3 && (
                          <div className="absolute w-2/3 h-1/2 bottom-20 right-0 z-10 md:bottom-10">
                            <Image
                              className="relative h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105 rounded-lg border-1 dark:border-dark-lighter"
                              alt={project.title}
                              src={project.images[3].imageURL}
                              blurDataURL={project.images[3].imageURL}
                              placeholder="blur"
                              fill
                              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw"
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <Image
                        src={"/images/no-image.jpg"}
                        loading="lazy"
                        alt="no-image"
                        width={100}
                        height={100}
                        placeholder="blur"
                        blurDataURL={"/images/no-image.jpg"}
                      />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div className="md:text-sm text-lg flex text-gray-500 justify-between items-center md:flex-col md:gap-4">
                      <div className="flex gap-4">
                        <span className="font-semibold">Created: </span>
                        <span>
                          {new Date(project.createdDate).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex gap-4 items-center text-sm">
                        <Link
                          href={project.demo}
                          target="_blank"
                          rel="nofollow"
                        >
                          <button className="py-1 flex gap-2 items-center read-more-button bg-primary dark:bg-primary rounded-md text-text-light md:px-6 px-4 cursor-pointer border-2 border-primary hover:bg-transparent hover:text-dark hover:border-primary dark:hover:text-light dark:hover:bg-transparent">
                            Live Demo
                            <ArrowUpRightFromCircle size={16} />
                          </button>
                        </Link>
                        <Link
                          href={project.source}
                          target="_blank"
                          rel="nofollow"
                        >
                          <button className="px-4 py-1 flex items-center gap-2 bg-[#302e2e] text-light hover:bg-transparent hover:text-dark dark:hover:text-light border-1 border-[#302e2e] hover:border-[#1aa1ed] rounded-md">
                            Source
                            <GithubIcon size={18} />
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="pb-2 font-bold flex justify-between items-center">
                      <Link href={"/projects/" + project._id}>
                        <h4 className="md:text-xl text-2xl">{project.title}</h4>
                      </Link>
                    </div>

                    <div
                      id="tab-description"
                      className="prose prose-lg overflow-hidden block text-ellipsis max-h-56 mb-4"
                      dangerouslySetInnerHTML={{
                        __html: project.description,
                      }}
                    ></div>
                    <Link href={"/projects/" + project._id}>
                      <button className="dark:hover:bg-transparent read-more-button bg-primary dark:bg-primary rounded-md text-text-light md:px-6 px-10 py-3 cursor-pointer border-2 border-primary hover:bg-transparent hover:text-dark hover:border-primary dark:hover:text-light">
                        Read More About the Project
                      </button>
                    </Link>
                    <div className="flex md:p-2 py-5 gap-2 border-b-2 dark:border-dark-lighter flex-wrap justify-left">
                      {project.selectedTech.map(
                        (tech: string, index: number) => (
                          <TechStackIcon tech={tech} key={index} />
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default projects;
