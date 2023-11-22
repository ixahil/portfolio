type Props = {
  logoName: String;
};

const Footer = ({ logoName }: Props) => {
  const logo = logoName.split(' ');
  return (
    <footer className="border-t-4 border-[#acacb4] py-8 text-center text-[#acacb4] dark:border-dark-lighter dark:bg-dark">
      <div className="flex flex-col justify-end px-16 md:items-center">
        <p>Made with &lt;3 by {logo[1]}</p>
        <p>© 2023 {logo.join(' ')}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
