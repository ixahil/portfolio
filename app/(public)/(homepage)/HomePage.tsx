import React, { Suspense } from "react";
import Projects from "../../../components/Public/Projects";
import Home from "../../../components/Public/Home";
import About from "../../../components/Public/About";
import Contact from "../../../components/Public/Contact";
import { Skeleton } from "@nextui-org/react";
import Loading from "@/app/loading";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Home />
      <Suspense fallback={<Loading />}>
        <Projects />
      </Suspense>
      <About />
      <Contact />
    </>
  );
};

export default page;
