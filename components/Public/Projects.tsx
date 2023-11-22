import Link from 'next/link';
import { getAllProjects } from '@/utils/public/api/GetData';
import TechStackIcon from './landingPage/TechStackIcons';
import Image from 'next/image';
import { ArrowUpRightFromCircle, GithubIcon } from 'lucide-react';

async function projects() {
  setTimeout(() => {}, 20000);
  const data = (await getAllProjects()) || [];
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';

  if (!data) {
    return <p>No Projects available.</p>;
  } else {
    return (
      <section className="w-full py-36 md:px-8 md:py-24" id="projects">
        <div className="mx-auto flex w-5/6 flex-col gap-24 md:w-full">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="leading-12 text-3xl font-bold tracking-[2rem] text-primary md:text-2xl md:tracking-widest">
              FEATURED
            </h2>
            <h2 className="text-5xl md:text-3xl">
              Sneak peek from the latest{' '}
              <span className="leading-[24px] text-primary">Projects</span>
            </h2>
          </div>

          <div className="flex flex-col gap-24 rounded-md md:p-0">
            {data.map((project: any, index: number) => {
              const sliderImages = project.images || [];

              return (
                <div
                  className="flex flex-row gap-24 md:flex-col md:items-start md:gap-8 lg:flex-col"
                  key={index}
                >
                  {/* w-2/4 md:w-full lg:w-full md:h-[250px] lg:h-2/2 */}
                  <div className="w-1/2 lg:h-full lg:w-full">
                    {sliderImages.length > 0 ? (
                      <>
                        <div className="relative h-3/4 w-full lg:h-[350px]">
                          <Image
                            className="rounded-lg border-1 object-contain shadow-sm shadow-overlay transition duration-300 ease-in-out hover:absolute hover:z-10 hover:scale-110 dark:border-dark-lighter md:w-full"
                            alt={project.title}
                            src={project.images[0].imageURL}
                            blurDataURL={project.images[0].imageURL}
                            placeholder="blur"
                            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw"
                            width={500}
                            height={500}
                          />
                          {sliderImages.length > 3 && (
                            <Image
                              className="absolute bottom-0 right-0 rounded-lg border-1 object-contain shadow-sm shadow-overlay transition duration-300 ease-in-out hover:scale-110 dark:border-dark-lighter md:w-4/5 lg:top-32"
                              alt={project.title}
                              src={project.images[3].imageURL}
                              blurDataURL={project.images[3].imageURL}
                              placeholder="blur"
                              sizes="(min-width: 768px) 33vw, (min-width: 640px) 33vw"
                              width={500}
                              height={500}
                            />
                          )}
                        </div>
                      </>
                    ) : (
                      <Image
                        src={'/images/no-image.jpg'}
                        loading="lazy"
                        alt="no-image"
                        width={100}
                        height={100}
                        placeholder="blur"
                        blurDataURL={'/images/no-image.jpg'}
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div className="flex items-center justify-between text-lg text-gray-500 md:flex-col md:gap-4 md:text-sm">
                      <div className="flex gap-4">
                        <span className="font-semibold">Created: </span>
                        <span>
                          {new Date(project.createdDate).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <Link href={project.demo} target="_blank" rel="nofollow">
                          <button className="read-more-button flex cursor-pointer items-center gap-2 rounded-md border-2 border-primary bg-primary px-4 py-1 text-text-light hover:border-primary hover:bg-transparent hover:text-dark dark:bg-primary dark:hover:bg-transparent dark:hover:text-light md:px-6">
                            Live Demo
                            <ArrowUpRightFromCircle size={16} />
                          </button>
                        </Link>
                        <Link href={project.source} target="_blank" rel="nofollow">
                          <button className="flex items-center gap-2 rounded-md border-1 border-[#302e2e] bg-[#302e2e] px-4 py-1 text-light hover:border-[#1aa1ed] hover:bg-transparent hover:text-dark dark:hover:text-light">
                            Source
                            <GithubIcon size={18} />
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pb-2 font-bold">
                      <Link href={'/projects/' + project._id}>
                        <h4 className="text-2xl md:text-xl">{project.title}</h4>
                      </Link>
                    </div>

                    <div
                      id="tab-description"
                      className="prose prose-lg mb-4 block max-h-56 overflow-hidden text-ellipsis"
                      dangerouslySetInnerHTML={{
                        __html: project.description
                      }}
                    ></div>
                    <Link href={'/projects/' + project._id}>
                      <button className="read-more-button cursor-pointer rounded-md border-2 border-primary bg-primary px-10 py-3 text-text-light hover:border-primary hover:bg-transparent hover:text-dark dark:bg-primary dark:hover:bg-transparent dark:hover:text-light md:px-6">
                        Read More About the Project
                      </button>
                    </Link>
                    <div className="justify-left flex flex-wrap gap-2 border-b-2 py-5 dark:border-dark-lighter md:p-2">
                      {project.selectedTech.map((tech: string, index: number) => (
                        <TechStackIcon tech={tech} key={index} />
                      ))}
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
