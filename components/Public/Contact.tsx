"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
interface FormObject {
  [key: string]: string; // This type allows keys (property names) of type string, and values of type string
}

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const formObject: FormObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    const submitForm = async () => {
      setIsSubmitting(true);
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_V1 + "inquiry", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObject),
        });

        if (res.ok) {
          toast.success("Submitted Successfully!");
          setIsSubmitted(true);
        } else {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    submitForm();
  };

  return (
    <section id="contact" className="w-full h-full md:px-8">
      <div className="flex flex-row md:flex-col w-2/3 md:w-full mx-auto h-full py-36 md:py-16 justify-between">
        <div className="md:mr-8 text-start md:text-left">
          <h1 className="text-5xl md:text-3xl font-bold mb-4 leading-16 tracking-widest">
            Let's Work
            <br /> Together!
          </h1>
          <div className="mb-4">
            <h2 className="font-semibold text-lg">Mail</h2>
            <p>sahilshaiikh@hotmail.com</p>
          </div>
        </div>
        {isSubmitted ? (
          <div className="w-full md:w-full max-w-xl flex flex-col gap-4 ">
            <p>
              Thank you for your submission! I got your inquiry, and I will get
              back to you soon!.
            </p>
            <p>You should have received a follow-up email.</p>
          </div>
        ) : (
          <div className="w-full md:w-full max-w-xl">
            <form action="" className="" onSubmit={handleSubmit}>
              <input
                required
                type="text"
                className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Name"
                name="name"
              />
              <input
                required
                type="email"
                className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Email"
                name="email"
              />
              <input
                required
                type="text"
                className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Subject"
                name="subject"
              />
              <textarea
                required
                name="message"
                id=""
                cols={30}
                rows={10}
                className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Message"
                dirName="message"
              ></textarea>
              {isSubmitting ? (
                <button
                  disabled
                  type="submit"
                  className="w-full bg-blue-500 text-white font-semibold py-4 rounded-md hover:bg-blue-600 transition duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline mr-3 w-6 h-6 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    ></path>
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Submitting...
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-4 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Submit
                  </button>
                </>
              )}
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
