import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex justify-evenly py-8">
      <div className="flex flex-col gap-8">
        <div className="w-[70%] text-justify max-md:w-full">
          <h1 className="text-3xl">
            Let's Get in Touch: Ways to Connect with Me
          </h1>
        </div>
        <p className="text-[#65656d] text-xl w-[70%] text-justify max-md:w-full">
          Thank you for your interest in getting in touch with me. I welcome
          your feedback, questions, and suggestions. If you have a specific
          question or comment, please feel free to email me directly at
          sahilshaiikh@hotmail.com. I make an effort to respond to all messages
          within 24 hours, although it may take me longer during busy periods.
          Alternatively, you can use the contact form on my website to get in
          touch. Simply fill out the required fields and I'll get back to you as
          soon as possible. Finally, if you prefer to connect on social media,
          you can find me on https://instagram.com/. I post regular updates and
          engage with my followers there, so don't hesitate to reach out. Thanks
          again for your interest, and I look forward to hearing from you!
        </p>
      </div>
    </div>
  );
};

export default page;
