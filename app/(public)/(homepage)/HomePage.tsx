import React from "react";
import Image from "next/image";
import SocialIcons from "../utils/SocialIcons";
import Projects from "../components/Projects";
import Home from "../components/Home";
import About from "../components/About";
import Contact from "../components/Contact";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Home />
      <Projects />
      <About />
      <Contact />
    </>
  );
};

export default page;
