import type { Metadata } from 'next';
import Navbar from '@/components/Public/Navbar';
import Footer from '@/components/Public/Footer';
import ThemeProviderComponent from './ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { getSiteData } from '@/utils/Admin/fetch/GetSiteData';
import HomePage from './(homepage)/page';

export const metadata: Metadata = {
  title: 'Dev Sahil Portfolio',
  description:
    'I am a backend developer with expertise in Node.js. I have experience in building scalable, secure, and reliable web applications using various frameworks and technologies.'
};

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData();
  return (
    <>
      <ThemeProviderComponent>
        <Navbar logoName={data.logo} />
        <main className="mx-auto flex h-full w-full flex-col text-text-dark dark:bg-dark dark:text-text-light ">
          <HomePage data={data} />
        </main>
        <Footer logoName={data.logo} />
        <Toaster position="top-center" reverseOrder={false} />
      </ThemeProviderComponent>
    </>
  );
}
