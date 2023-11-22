'use client';

// import "./login.scss";
import { useState } from 'react';
import { useFormik } from 'formik';
// import { useSignIn } from "react-auth-kit";
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
// import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import localFont from 'next/font/local';
import { SyncLoader } from 'react-spinners';
import Link from 'next/link';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter your email!'),
  password: Yup.string().required('Please enter your password!').min(6)
});

const myFont = localFont({
  src: [
    {
      path: '../../fonts/Agustina.woff',
      weight: 'normal',
      style: 'normal'
    }
  ]
});

const Login = () => {
  // const signIn = useSignIn();
  const [show, setShow] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values: any) => {
      try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_V1 + 'login', values, {
          withCredentials: true
        });

        if (response.status === 200) {
          toast.success('Logged in Successfully!');
          router.push('/admin/dashboard/home');
        } else if (response.status === 401) {
          toast.error('Invalid Credentials!');
        } else {
          toast.error('Something Wrong!');
          throw new Error('Invalid credentials');
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

  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } = formik;

  return (
    <>
      {/* <!-- component --> */}
      <div className="flex min-h-screen flex-col justify-center bg-gray-100 text-dark sm:py-12">
        <div className="xs:p-0 mx-auto w-full max-w-md p-10">
          <h1 className={`logo mb-5 text-center text-4xl font-bold ${myFont.className}`}>
            <span>&lt; Sahil Shaikh /&gt;</span>
          </h1>
          <div className="divide-gray relative w-full divide-y rounded-lg bg-white shadow">
            <div className={`px-5 py-7 ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}>
              <div className="absolute right-[40%] top-[25%] z-20 text-center">
                <SyncLoader color="#0a64bc" size={15} loading={isSubmitting} />
              </div>
              {/* Conditionally render the spinner when isSubmitting is true */}

              <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="block pb-1 text-sm font-semibold text-gray-600">
                  E-mail
                </label>
                <input
                  id="email"
                  autoComplete="on"
                  type="text"
                  name="email"
                  className={`${
                    errors.email && touched.email && 'border-red-500'
                  } mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm`}
                  onChange={handleChange}
                />

                <label
                  htmlFor="password"
                  className=" block pb-1 text-sm font-semibold text-gray-600"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={!show ? 'password' : 'text'}
                    name="password"
                    className={`${
                      errors.password && touched.password && 'border-red-500'
                    }  mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm`}
                    value={values.password}
                    onChange={handleChange}
                  />
                  {!show ? (
                    <EyeOff
                      className="absolute right-2 top-3 cursor-pointer"
                      size={20}
                      onClick={() => setShow(true)}
                    />
                  ) : (
                    <Eye
                      className="absolute right-2 top-3 cursor-pointer"
                      size={20}
                      onClick={() => setShow(false)}
                    />
                  )}
                </div>

                {errors.password && touched.password && (
                  <span className="block py-2 text-red-500">{errors.password?.toString()}</span>
                )}

                <div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`inline-block w-full rounded-lg bg-blue-500 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 hover:shadow-md focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 ${
                      isSubmitting && 'disabled'
                    }`}
                  >
                    <span className="mr-2 inline-block">Login</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="inline-block h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-1">
                <button
                  type="button"
                  className="inline-block w-full rounded-lg border border-gray-200 py-2.5 text-center text-sm font-normal text-gray-500 shadow-sm transition duration-200 hover:shadow-md"
                >
                  MailUp
                </button>
                <button
                  type="button"
                  className="inline-block w-full rounded-lg border border-gray-200 py-2.5 text-center text-sm font-normal text-gray-500 shadow-sm transition duration-200 hover:shadow-md"
                >
                  Google
                </button>
                <button
                  type="button"
                  className="inline-block w-full rounded-lg border border-gray-200 py-2.5 text-center text-sm font-normal text-gray-500 shadow-sm transition duration-200 hover:shadow-md"
                >
                  Github
                </button>
              </div>
            </div>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="whitespace-nowrap text-center sm:text-left">
                  <button className="mx-5 cursor-pointer rounded-lg px-5 py-4 text-sm font-normal text-gray-500 ring-inset transition duration-200 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="inline-block h-4 w-4 align-text-top"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="ml-1 inline-block">Forgot Password</span>
                  </button>
                </div>
                <div className="whitespace-nowrap text-center sm:text-right">
                  <button className="mx-5 cursor-pointer rounded-lg px-5 py-4 text-sm font-normal text-gray-500 ring-inset transition duration-200 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="inline-block h-4 w-4 align-text-bottom	"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="ml-1 inline-block">Help</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="whitespace-nowrap text-center sm:text-left">
                <Link href={'/'}>
                  <button className="mx-5 cursor-pointer rounded-lg px-5 py-4 text-sm font-normal text-gray-500 ring-inset transition duration-200 hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="inline-block h-4 w-4 align-text-top"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <span className="ml-1 inline-block">Back to Dev.Sahil.com</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Login;
