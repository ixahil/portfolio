import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeProviderComponent from "./ThemeProvider";

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
        <main className="mx-auto md:px-6 flex flex-col h-full w-full ">
          {children}
        </main>
        <Footer />
      </ThemeProviderComponent>
    </>
  );
}
