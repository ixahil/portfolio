import { getSingleProject } from "../../api/GetData";
import CustomImageSlider from "../../components/landingPage/CustomImageSlider";
import Tabs from "../../components/landingPage/Tabs";
import TechStackIcon from "../../components/landingPage/TechStackIcons";

const page = async ({ params }: { params: { slug: string } }) => {
  const project = (await getSingleProject(params.slug)) || [];

  const modifiedDate = new Date(project.updatedAt).toDateString();

  return (
    <section className="max-w-[1200px] mx-auto">
      <div className="min-h-screen w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className=" ">
          {/* Project Images */}
          {project.images && (
            <div className="mb-6">
              <CustomImageSlider images={project.images} />
            </div>
          )}

          {/* Project Title */}
          <h1 className="text-3xl font-semibold my-4">{project.title}</h1>

          {/* Created and Modified Dates */}
          <div className="flex justify-between text-gray-500 mb-6">
            <div>
              <p className="font-semibold">Created:</p>
              <p>{project.createdDate}</p>
            </div>
            <div>
              <p className="font-semibold">Modified:</p>
              <p>{modifiedDate}</p>
            </div>
          </div>

          {/* Project Tech */}
          {project.selectedTech && (
            <div className="flex items-center mt-2 gap-10 py-4">
              {project.selectedTech.map((tech: string, index: number) => (
                <TechStackIcon tech={tech} key={index} />
              ))}
            </div>
          )}
          <Tabs description={project.description} />
        </div>
      </div>
    </section>
  );
};

export default page;
