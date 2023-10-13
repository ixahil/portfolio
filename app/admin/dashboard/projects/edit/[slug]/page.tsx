import ProjectForm from "@/components/shared/projectForm/ProjectForm";
import { FormProvider } from "@/context/FormContext";
import { getSingleProject } from "@/utils/fetch/GetProjects";
import toast from "react-hot-toast";
import Loading from "../../../loading";
import { Suspense } from "react";

type Props = {};

const page = async ({ params }: { params: { slug: string } }) => {
  const data = await getSingleProject(params.slug);

  return (
    <div>
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
