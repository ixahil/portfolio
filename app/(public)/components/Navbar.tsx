"use client";

import Link from "next/link";
import React, { useState } from "react";
import { BsGithub } from "react-icons/bs";
import ThemeSwitch from "../utils/ThemeSwitch";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { BiMenu } from "react-icons/bi";
import localFont from "next/font/local";
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const contentStyle = {
    transition: "transform 0.3s ease-in-out",
    transform: isMobileMenuOpen ? "translateY(100%)" : "translateY(0)",
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header className="hidden lg:flex flex-wrap items-center p-4 md:px-20 sticky top-[20px] z-50 py-[20px] justify-between">
        <div className="flex flex-1">
          <h1
            className={`text-2xl md:text-3xl lg:text-4xl ${myFont.className}`}
          >
            &lt;Dev. Sahil&gt;
          </h1>
        </div>
        <div className="flex flex-1 w-full md:w-1/2">
          <nav className="bg-[#fff] dark:bg-gray-dark py-2 px-4 rounded-[40px] shadow-lg">
            <ul className="flex gap-10 flex-col md:flex-row md:gap-10">
              <Link
                key={1}
                className={` active:text-[#1aa1ed] hover:text-[#1aa1ed] ${
                  active === 1 && "text-[#1aa1ed]"
                }`}
                href={"/"}
                onClick={() => setActive(1)}
              >
                Home
              </Link>
              <Link
                key={2}
                onClick={() => setActive(2)}
                className={` active:text-[#1aa1ed] hover:text-[#1aa1ed] ${
                  active === 2 && "text-[#1aa1ed]"
                }`}
                href={"/projects"}
              >
                Projects
              </Link>
              <Link
                key={3}
                onClick={() => setActive(3)}
                className={` active:text-[#1aa1ed] hover:text-[#1aa1ed] ${
                  active === 3 && "text-[#1aa1ed]"
                }`}
                href={"/about"}
              >
                About
              </Link>
              <Link
                key={4}
                onClick={() => setActive(4)}
                className={` active:text-[#1aa1ed] hover:text-[#1aa1ed] ${
                  active === 4 && "text-[#1aa1ed]"
                }`}
                href={"/contact"}
              >
                Contact
              </Link>
            </ul>
          </nav>
        </div>

        <div className="flex gap-12 items-center">
          <div>
            <ThemeSwitch
              taglineDay={"Not a Day Dreamer?"}
              taglineNight={"Not a Night Owl?"}
            />
          </div>
          <div className="flex gap-3 justify-center items-center">
            <Link href={"https://github.com/ixahil"} target="_blank">
              <BsGithub size={30} cursor="pointer" />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/xahilshaikh/"}
              target="_blank"
            >
              <TiSocialLinkedinCircular size={42} cursor="pointer" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <header className="md:hidden flex flex-wrap items-center p-4 md:px-20">
        {/* Burger Icon (Visible on mobile) */}
        <div className="md:hidden">
          <BiMenu size={30} cursor="pointer" onClick={toggleMobileMenu} />
        </div>

        {/* Logo (Visible on all screens) */}
        <div className="flex flex-1">
          <h1
            className={`text-3xl md:text-3xl lg:text-4xl ${myFont.className}`}
          >
            Dev Sahil
          </h1>
        </div>

        {/* Content (Visible when the menu is closed) */}
        {/* Social Icons and Theme Switch (Visible on all screens) */}
        <div className="md:hidden flex gap-5 items-center">
          <div>
            <ThemeSwitch taglineDay={""} taglineNight={""} />
          </div>
          <div className="flex gap-2 justify-center items-center">
            <Link href={"https://github.com/ixahil"} target="_blank">
              <BsGithub size={30} cursor="pointer" />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/xahilshaikh/"}
              target="_blank"
            >
              <TiSocialLinkedinCircular size={42} cursor="pointer" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation (Visible on mobile when the menu is open) */}
        {isMobileMenuOpen && (
          <nav className="w-full bg-white">
            <ul className=" text-center">
              <li className="my-4">
                <Link
                  key={1}
                  onClick={() => setActive(1)}
                  className={` active:text-[#1aa1ed] hover:text-[#1aa1ed] ${
                    active === 1 && "text-[#1aa1ed]"
                  }`}
                  href={"/"}
                >
                  Home
                </Link>
              </li>
              <li className="my-4">
                <Link
                  key={2}
                  onClick={() => setActive(2)}
                  className={` active:text-[#1aa1ed] hover:text-[#1aa1ed] ${
                    active === 2 && "text-[#1aa1ed]"
                  }`}
                  href={"/projects"}
                >
                  Projects
                </Link>
              </li>
              <li className="my-4">
                <Link
                  key={3}
                  onClick={() => setActive(3)}
                  className={` active:text-[#1aa1ed] hover:text-[#1aa1ed] ${
                    active === 3 && "text-[#1aa1ed]"
                  }`}
                  href={"/about"}
                >
                  About
                </Link>
              </li>
              <li className="my-4">
                <Link
                  key={4}
                  onClick={() => setActive(4)}
                  className={` active:text-[#1aa1ed] hover:text-[#1aa1ed] ${
                    active === 4 && "text-[#1aa1ed]"
                  }`}
                  href={"/contact"}
                >
                  Contact
                </Link>
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
