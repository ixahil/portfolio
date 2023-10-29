import Link from "next/link";
import { getAllProjects } from "@/utils/public/api/GetData";
import TechStackIcon from "./landingPage/TechStackIcons";
import Image from "next/image";

async function projects() {
  const data = (await getAllProjects()) || [];

  if (!data) {
    return <p>No Projects available.</p>;
  } else {
    return (
      <section className="py-14 md:p-8 w-full" id="projects">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
          <div className="text-center flex items-center flex-col justify-center">
            <h2 className="text-primary md:text-2xl text-3xl font-bold leading-12 tracking-[2rem]">
              FEATURED
            </h2>
            <h2 className="md:text-3xl text-5xl">
              Sneak peek from the latest{" "}
              <span className="leading-[24px] text-primary">Projects</span>
            </h2>
          </div>
          <div className="flex flex-col gap-10 p-8 md:p-0 rounded-md">
            {data.map((project: any, index: number) => {
              const sliderImages = project.images || [];

              return (
                <div
                  className="flex gap-10 flex-row md:flex-col md:items-start"
                  key={index}
                >
                  <div className="max-w-[500px] max-h-[250px] md:max-w-full md:max-h-full self-center">
                    {sliderImages.length > 0 ? (
                      <Image
                        src={project.images[0].imageURL}
                        alt={project.title}
                        width={500}
                        height={100}
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                        }}
                        objectFit="cover"
                      />
                    ) : (
                      <Image
                        src={"/images/no-image.jpg"}
                        alt="no-image"
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div className="pb-2 font-bold flex justify-between items-center">
                      <Link href={"/projects/" + project._id}>
                        <h4 className="md:text-xl text-2xl">{project.title}</h4>
                      </Link>
                      <p className=" md:text-base text-xl">
                        {new Date(project.createdDate).toLocaleDateString(
                          undefined,
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div
                      id="tab-description"
                      className="prose prose-lg overflow-hidden block text-ellipsis max-h-56 mb-4"
                      dangerouslySetInnerHTML={{
                        __html: project.description,
                      }}
                    ></div>
                    <Link href={"/projects/" + project._id}>
                      <button className="read-more-button bg-primary dark:bg-primary rounded-md text-text-light md:px-6 px-10 py-3 cursor-pointer border-2 border-primary hover:bg-transparent hover:text-dark hover:border-primary dark:hover:text-light">
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
