'use client';
import { Mail } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { SiSkype } from 'react-icons/si';
interface FormObject {
  [key: string]: string; // This type allows keys (property names) of type string, and values of type string
}

type Props = {
  data: {
    instagram: string;
    linkedin: string;
    git: string;
    email: string;
    resume: string;
    name: string;
  };
};

const Contact = ({ data }: Props) => {
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
        const res = await fetch(process.env.NEXT_PUBLIC_API_V1 + 'inquiry', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formObject)
        });

        if (res.ok) {
          toast.success('Submitted Successfully!');
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
    <section id="contact" className="h-full w-full md:px-8">
      <div className="mx-auto flex h-full w-5/6 flex-row justify-between py-36 md:w-full md:flex-col md:py-16">
        <div className="text-start md:mr-8 md:text-left">
          <h1 className="leading-16 mb-4 text-5xl font-bold tracking-widest md:text-3xl">
            Let's Work
            <br /> Together!
          </h1>
          <div className="mb-4">
            <h2 className="mb-2 text-lg font-semibold">Mail</h2>
            <a
              href="mailto:sahilshaiikh@hotmail.com"
              className="flex items-center gap-2 transition duration-300 ease-in-out hover:scale-105"
            >
              <Mail size={28} />
              {data.email}
            </a>
          </div>
          <div className="mb-4">
            <h2 className="mb-2 text-lg font-semibold">Skype</h2>
            <a
              href="skype:live:sahilshaiikh?chat"
              className="flex items-center gap-2 transition duration-300 ease-in-out hover:scale-105"
            >
              <SiSkype size="28" />
              Let's Chat
            </a>
          </div>
        </div>
        {isSubmitted ? (
          <div className="flex w-full max-w-xl flex-col gap-4 md:w-full ">
            <p>
              Thank you for your submission! I got your inquiry, and I will get back to you soon!.
            </p>
            <p>You should have received a follow-up email.</p>
          </div>
        ) : (
          <div className="w-full max-w-xl md:w-full">
            <h2 className="mb-8 text-lg font-semibold">
              Please fill out to fill out this form and I will get back to you ASAP!
            </h2>
            <form action="" className="" onSubmit={handleSubmit}>
              <input
                required
                type="text"
                className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                name="name"
              />
              <input
                required
                type="email"
                className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                name="email"
              />
              <input
                required
                type="text"
                className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject"
                name="subject"
              />
              <textarea
                required
                name="message"
                id=""
                cols={30}
                rows={10}
                className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Message"
                dirName="message"
              ></textarea>
              {isSubmitting ? (
                <button
                  disabled
                  type="submit"
                  className="w-full items-center rounded-md bg-blue-500 px-5 py-4 text-center font-semibold text-white transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="mr-3 inline h-6 w-6 animate-spin text-white"
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
                    className="w-full rounded-md bg-blue-500 py-4 font-semibold text-white transition duration-300 hover:bg-blue-600"
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
