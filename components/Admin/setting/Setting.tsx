'use client';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import localFont from 'next/font/local';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const myFont = localFont({
  src: [
    {
      path: '../../../public/fonts/Agustina.woff',
      weight: 'normal',
      style: 'normal'
    }
  ]
});
const projectSchema = Yup.object().shape({
  logo: Yup.string().required('logo is required'),
  name: Yup.string().required('name is required'),
  position: Yup.string().required('position is required'),
  email: Yup.string().required('email is required')
});

type Props = {
  initialValues: {
    _id: string;
    logo: string;
    name: string;
    position: string;
    email: string;
    git: string;
    linkedin: string;
    instagram: string;
    resume: string;
    file: Blob;
  };
};

const Setting = ({ initialValues }: Props) => {
  const [editingLogo, setEditingLogo] = useState(false);

  const handleLogoClick = () => {
    setEditingLogo(true);
  };

  const handleLogoBlur = () => {
    setEditingLogo(false);
  };

  const initialValue = { ...initialValues };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: projectSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        // Append other form data
        formData.append('logo', values.logo);
        formData.append('name', values.name);
        formData.append('position', values.position);
        formData.append('email', values.email);
        formData.append('git', values.git);
        formData.append('linkedin', values.linkedin);
        formData.append('instagram', values.instagram);
        // Append file if present
        if (values.file) {
          formData.append('resume', values.file);
        }
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_V1}update-sitedata`, formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (res.status === 201) {
          toast.success('Updated Successfully!');
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          // Handle Axios-specific errors
          if (error.response && error.response.data) {
            const axiosErr = error.response.data.message;
            toast.error(axiosErr);
          } else {
            toast.error('An error occurred with Axios. Please try again later.');
          }
        } else {
          // Handle other types of errors
          console.error(error); // Log the error for debugging
          toast.error('An error occurred. Please try again later.');
        }
      }
    }
  });
  const { isSubmitting, handleChange, handleSubmit, values, errors, touched } = formik;

  const fileName = values?.resume?.split('\\')[3] || '';

  const logo = values?.logo?.split(' ') || '';

  const resume = process.env.NEXT_PUBLIC_BACKEND_FOLDER + values.resume;

  return (
    <div className="h-full p-16">
      <form className="h-full" onSubmit={handleSubmit}>
        <div className={`flex flex-col items-center gap-8 ${myFont.className}`}>
          {editingLogo ? (
            <input
              type="text"
              name="logo"
              value={values.logo}
              className={`w-1/2 rounded border border-light-lighter px-3 py-6 text-center text-2xl dark:border-dark-lighter`}
              onChange={handleChange}
              onBlur={handleLogoBlur}
            />
          ) : (
            <div
              onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}
              className="relative m-2 rounded-xl border-3 p-8"
            >
              <h1 className={`text-center text-3xl`}>
                &lt;{logo[0]} <span className="text-primaryLight">{logo[1]} </span>&gt;
              </h1>
              <span role="img" aria-label="pencil" className="absolute right-0 top-2">
                ✏️
              </span>
            </div>
          )}
        </div>
        <div className="flex w-full items-center gap-6 py-8">
          <div className="flex w-1/2 flex-col gap-4">
            <label htmlFor="name" className="pr-4">
              About Name
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              className="mt-1 w-full rounded border border-light-lighter px-3 py-2 dark:border-dark-lighter"
              onChange={handleChange}
            />
          </div>

          <div className="flex w-1/2 flex-col gap-4">
            <label htmlFor="position" className="pr-4">
              Position
            </label>
            <input
              type="text"
              name="position"
              value={values.position}
              className="mt-1 w-full rounded border border-light-lighter px-3 py-2 dark:border-dark-lighter"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex w-full items-start gap-6 py-16">
          <div className="flex w-1/2 flex-col gap-4">
            <h2 className="text-center text-2xl">Contact</h2>

            <label htmlFor="email" className="pr-4">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              value={values.email}
              className="mt-1 w-full rounded border border-light-lighter px-3 py-2 dark:border-dark-lighter"
              onChange={handleChange}
            />
            <label htmlFor="git" className="pr-4">
              Github Profile
            </label>
            <input
              type="text"
              name="git"
              value={values.git}
              className="mt-1 w-full rounded border border-light-lighter px-3 py-2 dark:border-dark-lighter"
              onChange={handleChange}
            />
            <label htmlFor="linkedin" className="pr-4">
              Linkedin Profile
            </label>
            <input
              type="text"
              name="linkedin"
              value={values.linkedin}
              className="mt-1 w-full rounded border border-light-lighter px-3 py-2 dark:border-dark-lighter"
              onChange={handleChange}
            />
            <label htmlFor="instagram" className="pr-4">
              Instagram Profile
            </label>
            <input
              type="text"
              name="instagram"
              value={values.instagram}
              className="mt-1 w-full rounded border border-light-lighter px-3 py-2 dark:border-dark-lighter"
              onChange={handleChange}
            />
          </div>

          <div className="flex w-1/2 flex-col gap-4">
            <h2 className="text-center text-2xl">Attachments</h2>

            <label htmlFor="resume" className="pr-4">
              Resume
            </label>

            <div className="flex items-center gap-4 rounded-xl bg-[#efefef] p-8 dark:bg-dark">
              <input
                type="file"
                className=""
                id="resume"
                name="resume"
                accept="application/pdf"
                onChange={(event) => {
                  formik.setFieldValue('file', event.currentTarget.files?.[0] || null);
                }}
              />
              <Link className="text-xl font-semibold" href={resume}>
                Open {fileName}
              </Link>
            </div>

            {/* Display errors or other form fields... */}
          </div>
        </div>

        <button
          type="submit"
          className="focus:shadow-outline h-12 w-full rounded-lg bg-blue-700 px-6 text-indigo-100 transition-colors duration-150 hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Setting;
