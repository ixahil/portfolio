"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import ThemeSwitch from "../utils/ThemeSwitch";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { BiMenu } from "react-icons/bi";
import localFont from "next/font/local";

import debounce from "lodash/debounce";
import { Link as LinkScroll } from "react-scroll";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useViewportScroll, useTransform } from "framer-motion";

type Props = {};

const myFont = localFont({
  src: [
    {
      path: "../../fonts/Agustina.woff",
      weight: "normal",
      style: "normal",
    },
  ],
});

const Navbar = (props: Props) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<Number>(1);
  const [isScrollPast, setIsScrollPast] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const contentStyle = {
    transition: "transform 0.3s ease-in-out",
    transform: isMobileMenuOpen ? "translateY(100%)" : "translateY(0)",
  };

  const debouncedHandleScroll = debounce(() => {
    if (window.scrollY > 400) {
      setIsScrollPast(true);
    } else {
      setIsScrollPast(false);
    }
  }, 100); // Adjust the debounce time as needed

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, []);

  const navVariants = {
    initial: {
      y: -50,
      x: "-50%",
      opacity: 0,
    },
    animate: {
      y: 0,
      x: "-50%",
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      y: -50,
      opacity: 0,
    },
  };

  const themeVariants = {
    initial: {
      y: -50,
      x: "-50%",
      opacity: 0,
    },
    animate: {
      y: 0,
      x: "-50%",
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      y: -50,
      opacity: 0,
    },
  };

  const { scrollY } = useViewportScroll();
  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 183, 255, 0)", "rgba(0, 183, 255, 1)"]
  );
  const height = useTransform(scrollY, [0, 100], [120, 60]);

  return (
    <>
      {/* Desktop Navigation */}
      <AnimatePresence>
        {" "}
        {isScrollPast ? (
          <>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={navVariants}
              className=" fixed z-[999] top-4 left-1/2 -translate-x-1/2 rounded-full p-1 bg-dark text-light bg-opacity-[1] backdrop-blur-lg border border-white border-opacity-[.08] dark:bg-gray-dark py-2 px-6 shadow-lg dark:bg-dark"
            >
              <ul className="flex gap-10 flex-row">
                <Link
                  key={1}
                  className={`__nav_li hover:cursor-pointer hover:text-text-primaryLight ${
                    active === 1 && "text-text-primaryLight"
                  }`}
                  href="/"
                  // onClick={() => setActive(1)}
                  onClick={() => setActive(1)}
                >
                  Home
                </Link>
                <LinkScroll
                  key={2}
                  // onClick={() => setActive(2)}
                  className={`__nav_li hover:cursor-pointer hover:text-text-primaryLight ${
                    active === 2 && "text-text-primaryLight"
                  }`}
                  to={"projects"}
                  spy={true}
                  smooth={true}
                  offset={-20}
                  duration={100}
                  onSetActive={() => setActive(2)}
                >
                  Projects
                </LinkScroll>
                <LinkScroll
                  key={3}
                  className={`__nav_li hover:cursor-pointer hover:text-text-primaryLight ${
                    active === 3 && "text-text-primaryLight"
                  }`}
                  to={"about"}
                  spy={true}
                  smooth={true}
                  offset={-20}
                  duration={100}
                  onSetActive={() => setActive(3)}
                >
                  About
                </LinkScroll>
                <LinkScroll
                  key={4}
                  className={`__nav_li hover:cursor-pointer hover:text-text-primaryLight ${
                    active === 4 && "text-text-primaryLight"
                  }`}
                  to={"contact"}
                  spy={true}
                  smooth={true}
                  offset={-20}
                  duration={100}
                  onSetActive={() => setActive(4)}
                >
                  Contact
                </LinkScroll>
              </ul>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={themeVariants}
              className="md:top-[90%] fixed z-[999] top-4 right-1 rounded-full p-2 text-text-light bg-dark bg-opacity-[1] backdrop-blur-lg border border-white border-opacity-[.08] dark:bg-gray-dark shadow-lg dark:bg-dark"
            >
              <ThemeSwitch taglineDay={""} taglineNight={""} />
            </motion.div>
          </>
        ) : (
          <header className="md:hidden lg:hidden flex flex-wrap items-center justify-between relative text-text-light px-16 bg-gradient-header dark:bg-gradient-dark py-4">
            {/* <Image
              src="/images/header-bg.jpg"
              alt="header-bg"
              quality={100}
              fill
              sizes="100vw"
              objectFit="cover"
              className="z-[-1]"
            /> */}
            <div className="flex bg-dark py-2 pt-5 px-6 font-bold rounded-full">
              <h1 className={`text-3xl ${myFont.className} cursor-pointer`}>
                &lt;Dev. <span className="text-primaryLight">Sahil </span>&gt;
              </h1>
            </div>
            <div className="flex pr-24">
              <nav className="bg-dark py-2 px-6 rounded-full shadow-lg">
                <ul className="flex gap-10 flex-row">
                  <Link
                    key={1}
                    className={`__nav_li hover:cursor-pointer hover:text-text-primaryLight ${
                      active === 1 && "text-text-primaryLight"
                    }`}
                    href="/"
                    onClick={() => setActive(1)}
                  >
                    Home
                  </Link>
                  <LinkScroll
                    key={2}
                    // onClick={() => setActive(2)}
                    className={`__nav_li hover:cursor-pointer hover:text-text-primaryLight ${
                      active === 2 && "text-text-primaryLight"
                    }`}
                    to={"projects"}
                    spy={true}
                    smooth={true}
                    offset={-20}
                    duration={100}
                    onSetActive={() => setActive(2)}
                    href="#projects"
                  >
                    Projects
                  </LinkScroll>
                  <LinkScroll
                    key={3}
                    className={`__nav_li hover:cursor-pointer hover:text-text-primaryLight ${
                      active === 3 && "text-text-primaryLight"
                    }`}
                    to={"about"}
                    spy={true}
                    smooth={true}
                    offset={-20}
                    duration={100}
                    onSetActive={() => setActive(3)}
                    href="#about"
                  >
                    About
                  </LinkScroll>
                  <LinkScroll
                    key={4}
                    className={`__nav_li hover:cursor-pointer hover:text-text-primaryLight ${
                      active === 4 && "text-text-primaryLight"
                    }`}
                    to={"contact"}
                    spy={true}
                    smooth={true}
                    offset={-20}
                    duration={100}
                    onSetActive={() => setActive(4)}
                    href="#contact"
                  >
                    Contact
                  </LinkScroll>
                </ul>
              </nav>
            </div>

            <div className="flex gap-12 items-center">
              <div className="w-[207px]">
                <ThemeSwitch
                  taglineDay={"Not a Day Dreamer?"}
                  taglineNight={"Not a Night Owl?"}
                />
              </div>
              <div className="flex gap-3 justify-center items-center bg-primary py-0 px-6 rounded-full">
                <Link href={"https://github.com/ixahil"} target="_blank">
                  <BsGithub size={30} cursor="pointer" />
                </Link>
                <Link
                  href={"https://www.linkedin.com/in/ixahil/"}
                  target="_blank"
                >
                  <TiSocialLinkedinCircular size={40} cursor="pointer" />
                </Link>
              </div>
            </div>
          </header>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <header className="hidden md:flex lg:flex bg-dark flex-wrap items-center p-4 text-light relative">
        {/* <Image
          src="/images/header-bg.jpg"
          alt="header-bg"
          quality={100}
          fill
          sizes="100vw"
          objectFit="cover"
          className="z-[-1]"
        /> */}
        {/* Burger Icon (Visible on mobile) */}
        <div className="flex">
          <BiMenu size={30} cursor="pointer" onClick={toggleMobileMenu} />
        </div>

        {/* Logo (Visible on all screens) */}
        <div className="flex flex-1">
          <h1 className={`text-3xl ${myFont.className}`}>Dev Sahil</h1>
        </div>

        {/* Content (Visible when the menu is closed) */}
        {/* Social Icons and Theme Switch (Visible on all screens) */}
        <div className="flex gap-5 items-center">
          <div>
            <ThemeSwitch taglineDay={""} taglineNight={""} />
          </div>
          <div className="flex gap-2 justify-center items-center">
            <Link href={"https://github.com/ixahil"} target="_blank">
              <BsGithub size={30} cursor="pointer" />
            </Link>
            <Link href={"https://www.linkedin.com/in/ixahil/"} target="_blank">
              <TiSocialLinkedinCircular size={42} cursor="pointer" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation (Visible on mobile when the menu is open) */}
        {isMobileMenuOpen && (
          <nav className="w-full rounded-sm m-4 bg-dark">
            <ul className="text-center">
              <li className="my-4">
                <LinkScroll
                  key={1}
                  className={`__nav_li hover:cursor-pointer hover:text-text-blue ${
                    active === 1 && "__nav_li_active"
                  }`}
                  to={"/"}
                  // onClick={() => setActive(1)}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={100}
                  onSetActive={() => setActive(1)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </LinkScroll>
              </li>
              <li className="my-4">
                <LinkScroll
                  key={2}
                  className={`__nav_li hover:cursor-pointer hover:text-text-blue ${
                    active === 2 && "__nav_li_active"
                  }`}
                  to={"projects"}
                  // onClick={() => setActive(1)}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={100}
                  onSetActive={() => setActive(2)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </LinkScroll>
              </li>
              <li className="my-4">
                <LinkScroll
                  key={3}
                  className={`__nav_li hover:cursor-pointer hover:text-text-blue ${
                    active === 3 && "__nav_li_active"
                  }`}
                  to={"about"}
                  // onClick={() => setActive(1)}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={100}
                  onSetActive={() => setActive(3)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </LinkScroll>
              </li>
              <li className="my-4">
                <LinkScroll
                  key={4}
                  className={`__nav_li hover:cursor-pointer hover:text-text-blue ${
                    active === 4 && "__nav_li_active"
                  }`}
                  to={"contact"}
                  // onClick={() => setActive(1)}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={100}
                  onSetActive={() => setActive(4)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </LinkScroll>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

//   return (
//     <header className="flex flex-wrap items-center p-4 md:px-20 bg-gray">

//        {/* Mobile Menu (Hidden by default) */}

//       <div className="flex-1 ">
//         <h1 className="text-2xl md:text-3xl lg:text-4xl">Dev Sahil</h1>
//       </div>
//       <nav className="flex-1 w-full md:w-1/2 text-center md:text-right">
//         <ul className="flex gap-10 flex-col md:flex-row md:gap-10">
//           <Link href={"/"}>Home</Link>
//           <Link href={"/projects"}>Projects</Link>
//           <Link href={"/about"}>About</Link>
//           <Link href={"/contact"}>Contact</Link>
//         </ul>
//       </nav>
//       <div className="flex gap-12 items-center">
//         <div>
//           <ThemeSwitch />
//         </div>
//         <div className="flex gap-3 justify-center items-center">
//           <Link href={"https://github.com/ixahil"} target="_blank">
//             <BsGithub size={30} cursor="pointer" />
//           </Link>
//           <Link
//             href={"https://www.linkedin.com/in/xahilshaikh/"}
//             target="_blank"
//           >
//             <TiSocialLinkedinCircular size={42} cursor="pointer" />
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// };

export default Navbar;
