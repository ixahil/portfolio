import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

import { Inter } from 'next/font/google';
import ThemeProviderComponent from './ThemeProvider';
import Sidebar from '@/components/Admin/shared/sidebar/Sidebar';
import Header from '@/components/Admin/shared/header/Header';

// Token refresh logic

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sahil Dev | Admin',
  description:
    'I am a Full Stack developer with expertise in Node.js. I have experience in building scalable, secure, and reliable web apps using various frameworks and techs.',
  robots: 'noindex, nofollow'
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviderComponent>
      <div className="h-screen overflow-hidden bg-light text-dark dark:bg-dark dark:text-light">
        <div className="flex h-full flex-row justify-start">
          <Sidebar />
          <div className="h-full flex-1 overflow-auto pb-4 pt-8 text-dark dark:text-light">
            <Header />

            <main className="h-screen w-full p-4 text-dark dark:text-light">
              <section className="h-screen rounded-lg border-2 border-light-lighter p-4 text-dark dark:border-dark-lighter dark:text-light">
                {children}
              </section>
            </main>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </ThemeProviderComponent>
  );
}
