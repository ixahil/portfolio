import Link from "next/link";
import getData from "../api/GetData";
import TechStackIcon from "./TechStackIcons";
import Image from "next/image";

async function projects() {
  const data = await getAllProjects() || [];

  const PublicURL = process.env.BACKENDPUBLICURL;

  if (!data) {
    return <p>No data available.</p>;
  } else {
    return (
      <>
        <div className="text-center px-4 py-6 flex items-center flex-col">
          <h2 className="text-[#1aa1ed] text-2xl md:text-3xl font-bold leading-[24px] tracking-[1em]">
            FEATURED
          </h2>
          <h2 className="text-3xl md:text-5xl">
            Sneak peek from the latest{" "}
            <span className="leading-[24px] text-[#1aa1ed]">Projects</span>
          </h2>
        </div>
        <div className="flex flex-col gap-10">
          {data.projects.map((project: any, index: number) => {
            const sliderImages = project.images;

            return (
              <div
                className="flex flex-col gap-10 md:flex-row lg:flex-row"
                key={index}
              >
                <div className="text-[#fff] lg:max-w-[500px] lg:max-h-[250px] max-md:max-w-[100vw]">
                   { sliderImages &&
                  <img
                    src={project.images[0].imageURL}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                }
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="pb-2 font-bold ">
                    <Link href={"/project/" + project._id}>
                      <h4 className="text-xl md:text-2xl">{project.title}</h4>
                    </Link>
                    <p className="text-[#65656d] text-base md:text-xl">
                      4 Months ago
                    </p>
                  </div>
                  <div
                    id="tab-description"
                    className="prose prose-lg text-gray-700 overflow-hidden block text-ellipsis max-h-52 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: project.htmlDescription,
                    }}
                  ></div>
                  <Link href={"/project/" + project._id}>
                    <button className="read-more-button bg-[#000] text-[#fff] px-6 md:px-10 py-2 cursor-pointer hover:bg-[#302e2e] dark:bg-[#302e2e] dark:hover:[#584f4f]">
                      Read More
                    </button>
                  </Link>
                  <div className="flex p-2 md:p-5 justify-between border-b-2 flex-wrap">
                    {project.selectedTech.map((tech: string, index: number) => (
                      <TechStackIcon tech={tech} key={index} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default projects;
