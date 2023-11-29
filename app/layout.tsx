import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Sahil Shaikh - Full Stack Developer (Mern Stack Developer)',
  description:
    'I am a Full Stack developer with expertise in Node.js. I have experience in building scalable, secure, and reliable web apps using various frameworks and techs.',
  robots: 'index,follow',
  keywords:
    'full stack developer, web developer, mern, mern developer, mern stack, nodejs, react, software developer, sahil shaikh'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-text-light dark:text-text-dark`}>{children}</body>
    </html>
  );
}
