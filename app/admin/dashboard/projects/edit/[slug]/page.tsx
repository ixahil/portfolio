import ProjectForm from "@/components/Admin/shared/projectForm/ProjectForm";
import { FormProvider } from "@/context/FormContext";
import { getSingleProject } from "@/utils/Admin/fetch/GetProjects";

type Props = {};

const page = async ({ params }: { params: { slug: string } }) => {
  const data = await getSingleProject(params.slug);

  return (
    <div className="h-full">
      Edit Page
      {data ? (
        <FormProvider initialValues={data}>
          <ProjectForm />
        </FormProvider>
      ) : (
        <div className="">No Project</div>
      )}
    </div>
  );
};

export default page;
