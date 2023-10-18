"use client";

// import "./login.scss";
import { useState } from "react";
import { useFormik } from "formik";
// import { useSignIn } from "react-auth-kit";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import localFont from "next/font/local";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const myFont = localFont({
  src: [
    {
      path: "../../fonts/Agustina.woff",
      weight: "normal",
      style: "normal",
    },
  ],
});

const Login = () => {
  // const signIn = useSignIn();
  const [show, setShow] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values: any) => {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_V1 + "login",
          values,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          toast.success("Logged in Successfully!");
          router.push("/admin/dashboard/home");
        } else if (response.status === 401) {
          toast.error("Invalid Credentials!");
        } else {
          toast.error("Something Wrong!");
          throw new Error("Invalid credentials");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } =
    formik;

  return (
    <>
      {/* <!-- component --> */}
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto w-full max-w-md">
          <h1
            className={`logo font-bold text-center text-4xl mb-5 ${myFont.className}`}
          >
            <span>&lt; Sahil Shaikh /&gt;</span>
          </h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray">
            <div className="px-5 py-7">
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="email"
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  autoComplete="on"
                  type="text"
                  name="email"
                  className={`${
                    errors.email && touched.email && "border-red-500"
                  } border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full`}
                  onChange={handleChange}
                />

                <label
                  htmlFor="password"
                  className=" font-semibold text-sm text-gray-600 pb-1 block"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={!show ? "password" : "text"}
                    name="password"
                    className={`${
                      errors.password && touched.password && "border-red-500"
                    }  border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full`}
                    value={values.password}
                    onChange={handleChange}
                  />
                  {!show ? (
                    <EyeOff
                      className="absolute top-3 right-2 cursor-pointer"
                      size={20}
                      onClick={() => setShow(true)}
                    />
                  ) : (
                    <Eye
                      className="absolute top-3 right-2 cursor-pointer"
                      size={20}
                      onClick={() => setShow(false)}
                    />
                  )}
                </div>

                {errors.password && touched.password && (
                  <span className="text-red-500 py-2 block">
                    {errors.password?.toString()}
                  </span>
                )}

                <div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block ${
                      isSubmitting && "disabled"
                    }`}
                  >
                    <span className="inline-block mr-2">Login</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block"
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
                  className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                >
                  MailUp
                </button>
                <button
                  type="button"
                  className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                >
                  Google
                </button>
                <button
                  type="button"
                  className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                >
                  Github
                </button>
              </div>
            </div>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-top"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="inline-block ml-1">Forgot Password</span>
                  </button>
                </div>
                <div className="text-center sm:text-right whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-bottom	"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="inline-block ml-1">Help</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-top"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span className="inline-block ml-1">
                    Back to Dev.Sahil.com
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
