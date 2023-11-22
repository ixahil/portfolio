import React, { Suspense } from 'react';
import Projects from '@/components/Public/Projects';
import Home from '@/components/Public/Home';
import About from '@/components/Public/About';
import Contact from '@/components/Public/Contact';
import Loading from '@/app/loading';

type Props = {
  data: {
    instagram: string;
    linkedin: string;
    git: string;
    email: string;
    resume: string;
    name: string;
    position: string;
  };
};

const HomePage = async ({ data }: Props) => {
  return (
    <>
      <Home data={data} />
      <Suspense fallback={<Loading />}>
        <Projects />
      </Suspense>
      <About data={data} />
      <Contact data={data} />
    </>
  );
};

export default HomePage;
