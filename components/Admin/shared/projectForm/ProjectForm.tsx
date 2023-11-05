"use client";
import { useFormik } from "formik";

import * as Yup from "yup";
import { ImageGallery } from "./ImageGallery";
import { useFormContext } from "@/context/FormContext";
import TechStackIcons from "./TechStackIcons";
// import Editor from "./Editor";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import RichEditor from "./Editor";

const projectSchema = Yup.object().shape({
  title: Yup.string().required("Project Title is required"),
  createdDate: Yup.date()
    .max(new Date(), "Date cannot be in the future")
    .required("Date is required")
    .default(new Date()),
});

const ProjectForm = () => {
  const router = useRouter();
  const { slug } = useParams();
  const { formData } = useFormContext();
  const formik = useFormik({
    initialValues: formData,
    validationSchema: projectSchema,
    onSubmit: async (values) => {
      // New Create
      if (!slug) {
        try {
          const res = await axios.post(
            process.env.NEXT_PUBLIC_API_V1 + "create-project",
            {
              title: values.title,
              description: formData.description,
              selectedTech: formData.selectedTech,
              images: formData.images,
              status: values.status,
              createdDate:
                values.createdDate || new Date().toISOString().split("T")[0],
            },
            {
              withCredentials: true,
            }
          );
          if (res.status === 201) {
            toast.success("New Project Added Succesfully!");
            router.push("/admin/dashboard/projects");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await axios.put(
            process.env.NEXT_PUBLIC_API_V1 + "edit-project/" + slug,
            {
              title: values.title,
              description: formData.description,
              selectedTech: formData.selectedTech,
              images: formData.images,
              status: values.status,
              createdDate: values.createdDate,
            },
            {
              withCredentials: true,
            }
          );
          if (res.status === 201) {
            toast.success("Project Updated Successfully!");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  const { isSubmitting, handleChange, handleSubmit, values, errors, touched } =
    formik;

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-wrap form  ${isSubmitting && "loading"} h-full`}
    >
      <div className="md:w-1/2 w-[60%] p-4 flex justify-center items-center">
        <ImageGallery />
      </div>
      <div className="md:w-1/2 w-[40%] p-4">
        <div className="mb-4">
          <label htmlFor="title" className="block">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            placeholder="Enter Project Title"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 border-light-lighter dark:border-dark-lighter"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block">
            Project Accomplished
          </label>
          <input
            defaultValue={
              values.createdDate || new Date().toISOString().split("T")[0]
            }
            onChange={handleChange}
            type="date"
            id="date"
            name="createdDate"
            className="w-full border rounded px-3 py-2 mt-1 border-light-lighter dark:border-dark-lighter"
          />
        </div>
        <TechStackIcons />
        <div className="flex gap-10 items-center pb-4">
          <h4>Publish: </h4>
          <input
            name="status"
            type="checkbox"
            className="w-5 h-5"
            onChange={handleChange}
            checked={values.status}
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-green-500 text-white px-4 py-2 ${
              isSubmitting && "disabled"
            }`}
          >
            Submit
          </button>
        </div>

        {touched.title && errors.title && (
          <div className="text-red-500">{errors.title}</div>
        )}
        {touched.description && errors.description && (
          <div className="text-red-500">{errors.description}</div>
        )}
        {touched.selectedTech && errors.selectedTech && (
          <div className="text-red-500">{errors.selectedTech}</div>
        )}
        {touched.createdDate && errors.createdDate && (
          <div className="text-red-500">{errors.createdDate}</div>
        )}
      </div>
      <div className="w-full p-4">
        <label htmlFor="description" className="block mb-2">
          Project Description
        </label>
        {/* <Editor /> */}
        <RichEditor />
      </div>
    </form>
  );
};

export default ProjectForm;