import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeProviderComponent from "./ThemeProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Dev Sahil Portfolio",
  description:
    "I am a backend developer with expertise in Node.js. I have experience in building scalable, secure, and reliable web applications using various frameworks and technologies.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProviderComponent>
        <Navbar />
        <main className="mx-auto flex flex-col h-full w-full text-text-dark dark:text-text-light dark:bg-dark ">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </ThemeProviderComponent>
    </>
  );
}
