"use client";

import { Switch } from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import React from "react";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@radix-ui/react-label";
// import { Switch } from "@nextui-org/react";

type Props = {
  taglineDay: String;
  taglineNight: String;
};

const ThemeSwitcher = ({ taglineDay, taglineNight }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* <Switch
        defaultSelected
        size="lg"
        color="default"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <Sun className={`${className}`} />
          ) : (
            <Moon className={className} />
          )
        }
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <span>{taglineDay} </span>
        ) : (
          <span>{taglineNight} </span>
        )}
      </Switch> */}

      {theme === "dark" ? (
        <span>{taglineDay}</span>
      ) : (
        <span>{taglineNight}</span>
      )}
      {"   "}
      <Switch
        defaultSelected
        size="sm"
        color="default"
        className="pl-2"
        startContent={<Moon />}
        endContent={<Sun />}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      ></Switch>

      {/* {theme === "dark" ? (
        <div className="flex gap-4 items-center">
          <span>{taglineNight}</span>

          <BsSun size={30} cursor="pointer" onClick={() => setTheme("light")} />
        </div>
      ) : (
        <div className="flex gap-4  items-center">
          <span>{taglineDay}</span>
          <FiMoon size={30} cursor="pointer" onClick={() => setTheme("dark")} />
        </div>
      )}  */}
    </>
  );
};

export default ThemeSwitcher;
