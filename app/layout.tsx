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
  title: 'Dev Sahil Portfolio',
  description:
    'I am a backend developer with expertise in Node.js. I have experience in building scalable, secure, and reliable web applications using various frameworks and technologies.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-text-light dark:text-text-dark`}>{children}</body>
    </html>
  );
}
