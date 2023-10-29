"use client";
import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
};

export const ThemeTransitionOverlay = ({ children }: Props) => {
  const { theme, setTheme } = useTheme();
  const [showOverlay, setShowOverlay] = useState(false);

  // Detect theme change and trigger the overlay
  useEffect(() => {}, []);

  return (
    <>
      {theme === "dark" ? (
        <motion.div
          className="transition-overlay"
          initial={{ opacity: 0, backgroundColor: "#000" }}
          animate={{ opacity: 0.8, backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          exit={{ opacity: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
        ></motion.div>
      ) : (
        <></>
      )}
      {children}
    </>
  );
};
