import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="">
      <div className="flex flex-row md:flex-col max-w-[1200px] mx-auto h-full py-16 md:p-16 justify-between">
        <div className="md:mr-8 text-start md:text-left">
          <h1 className="text-5xl md:text-3xl font-bold mb-4 leading-16 tracking-widest">
            Let's Work
            <br /> Together!
          </h1>
          <div className="mb-4">
            <h2 className="font-semibold text-lg">Mail</h2>
            <p>xyz@gmail.com</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 max-w-xl">
          <form action="" className="">
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Name"
            />
            <input
              type="email"
              className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Email"
            />
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Message"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
