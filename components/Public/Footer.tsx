import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mt-8 py-8 border-t-4 border-[#acacb4] dark:border-dark-lighter text-center text-[#acacb4]">
      <div className="flex px-16 justify-end md:items-center flex-col">
        <p>Made with &lt;3 by Sahil</p>
        <p>© 2023 Dev. Sahil. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
