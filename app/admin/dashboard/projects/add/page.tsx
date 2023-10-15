import ProjectForm from "@/components/shared/projectForm/ProjectForm";
import { FormProvider } from "@/context/FormContext";

type Props = {};

type InitialValues = {
  title: string;
  description: string;
  images: []; // Use string[] instead of [string]
  status: boolean;
  selectedTech: []; // Use string[] instead of [string]
  createdDate: string;
};

const initialValues: InitialValues = {
  title: "",
  description: "",
  images: [],
  status: false,
  selectedTech: [],
  createdDate: "",
};

const page = () => {
  return (
    <div>
      Add Page
      <FormProvider initialValues={initialValues}>
        <ProjectForm />
      </FormProvider>
    </div>
  );
};

export default page;
