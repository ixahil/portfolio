import ProjectForm from "@/components/shared/projectForm/ProjectForm";
import { FormProvider } from "@/context/FormContext";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      Edit Page
      <FormProvider
        initialValues={{
          title: "",
          description: "",
          images: [],
          status: false,
          selectedTech: [],
          createdDate: new Date().toISOString().substring(0, 10),
        }}
      >
        <ProjectForm />
      </FormProvider>
    </div>
  );
};

export default page;
