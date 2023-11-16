import React from 'react';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="border-t-4 border-[#acacb4] py-8 text-center text-[#acacb4] dark:border-dark-lighter dark:bg-dark">
      <div className="flex flex-col justify-end px-16 md:items-center">
        <p>Made with &lt;3 by Sahil</p>
        <p>© 2023 Dev. Sahil. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
