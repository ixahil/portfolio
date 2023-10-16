import ProjectForm from "@/components/shared/projectForm/ProjectForm";
import { FormProvider } from "@/context/FormContext";

const initialValues = {
  title: "",
  description: "",
  images: [],
  status: false,
  selectedTech: [],
  createdDate: "",
  thumbnail: {
    imageURL: "",
    public_id: "",
  },
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
