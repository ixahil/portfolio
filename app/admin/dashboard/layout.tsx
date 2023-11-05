import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { Inter } from "next/font/google";
import ThemeProviderComponent from "./ThemeProvider";
import Sidebar from "@/components/Admin/shared/sidebar/Sidebar";
import Header from "@/components/Admin/shared/header/Header";
import { Suspense } from "react";
import Loading from "@/app/loading";

// Token refresh logic

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProviderComponent>
      <div className="h-screen bg-light text-dark dark:bg-dark dark:text-light overflow-hidden">
        <div className="flex flex-row justify-start h-full">
          <Sidebar />
          <div className="flex-1 pt-8 pb-4 text-dark dark:text-light h-full overflow-auto">
            <Header />

            <main className="w-full text-dark dark:text-light p-4 h-screen">
              <section className="border-2 border-light-lighter dark:border-dark-lighter rounded-lg p-4 text-dark dark:text-light h-full">
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </section>
            </main>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </ThemeProviderComponent>
  );
}
