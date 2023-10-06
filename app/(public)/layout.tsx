import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Sahil",
  description: "A Personal Portfolio Website",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <Navbar />
        <main className=" max-w-[1200px] mx-auto lg:py-8 max-md:pb-8 max-md:px-4">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
