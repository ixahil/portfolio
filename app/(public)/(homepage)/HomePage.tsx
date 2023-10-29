import React from "react";
import Projects from "../../../components/Public/Projects";
import Home from "../../../components/Public/Home";
import About from "../../../components/Public/About";
import Contact from "../../../components/Public/Contact";

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
