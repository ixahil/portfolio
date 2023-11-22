import { ArrowLeftCircle } from 'lucide-react';
import { getSingleProject } from '@/utils/public/api/GetData';
import CustomImageSlider from '@/components/Public/landingPage/CustomImageSlider';
import Tabs from '@/components/Public/landingPage/Tabs';
import TechStackIcon from '@/components/Public/landingPage/TechStackIcons';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '@/app/loading';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // read route params
  const id = params.slug;

  // fetch data
  const project = (await getSingleProject(id)) || [];

  return {
    title: project.title,
    description: project.description
  };
}

const page = async ({ params }: { params: { slug: string } }) => {
  const project = (await getSingleProject(params.slug)) || [];

  const modifiedDate = new Date(project.updatedAt).toDateString();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <section className="mx-auto w-full" id="landinaPage">
          <div className="m-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
            <Link className="flex items-center py-4" href={'/'}>
              <ArrowLeftCircle size={42} color="#dfdfdf" fill="black" /> Back to Home
            </Link>
            <div className=" ">
              {/* Project Images */}

              {project.images && (
                <div className="mb-6">
                  <CustomImageSlider images={project.images} />
                </div>
              )}

              {/* Project Title */}
              <h1 className="my-4 text-3xl font-semibold">{project.title}</h1>

              {/* Created and Modified Dates */}
              <div className="mb-6 flex justify-between text-gray-500">
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
                <div className="mt-2 flex flex-wrap justify-items-start gap-6 py-4">
                  {project.selectedTech.map((tech: string, index: number) => (
                    <TechStackIcon tech={tech} key={index} />
                  ))}
                </div>
              )}
              <Tabs description={project.description} />
            </div>
          </div>
        </section>
      </Suspense>
    </>
  );
};

export default page;
