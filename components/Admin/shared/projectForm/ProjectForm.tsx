"use client";
import { useFormik } from "formik";

import * as Yup from "yup";
import { ImageGallery } from "./ImageGallery";
import { useFormContext } from "@/context/FormContext";
import TechStackIcons from "./TechStackIcons";
import axios, { AxiosError } from "axios";
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
              source: values.source,
              demo: values.demo,
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
            router.back();
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            // Handle Axios-specific errors
            if (error.response && error.response.data) {
              const axiosErr = error.response.data.message;
              toast.error(axiosErr);
            } else {
              toast.error(
                "An error occurred with Axios. Please try again later."
              );
            }
          } else {
            // Handle other types of errors
            console.error(error); // Log the error for debugging
            toast.error("An error occurred. Please try again later.");
          }
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
            router.back();
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            // Handle Axios-specific errors
            if (error.response && error.response.data) {
              const axiosErr = error.response.data.message;
              toast.error(axiosErr);
            } else {
              toast.error(
                "An error occurred with Axios. Please try again later."
              );
            }
          } else {
            // Handle other types of errors
            console.error(error); // Log the error for debugging
            toast.error("An error occurred. Please try again later.");
          }
        }
      }
    },
  });

  const { isSubmitting, handleChange, handleSubmit, values, errors, touched } =
    formik;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-wrap form  ${
          isSubmitting && "opacity-50 pointer-events-none relative"
        } h-full`}
      >
        {isSubmitting && (
          <div
            className="absolute top-0 bottom-0 right-0 left-0 m-auto inline-block h-24 w-24 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
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
          <div className="mb-4">
            <label htmlFor="source" className="block">
              Source Code
            </label>
            <input
              type="text"
              id="source"
              name="source"
              value={values.source}
              placeholder="Enter Github URL"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 border-light-lighter dark:border-dark-lighter"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="demo" className="block">
              Demo URL
            </label>
            <input
              type="text"
              id="demo"
              name="demo"
              value={values.demo}
              placeholder="Enter DEMO URL"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 border-light-lighter dark:border-dark-lighter"
            />
          </div>
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
    </>
  );
};

export default ProjectForm;
