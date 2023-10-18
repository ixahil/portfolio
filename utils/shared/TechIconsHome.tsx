"use client";
import React from "react";
import { FaNodeJs, FaReact } from "react-icons/fa6";
import { SiExpress, SiMongodb } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { DiSass } from "react-icons/di";
import {
  SiTailwindcss,
  SiPostgresql,
  SiTypescript,
  SiJavascript,
} from "react-icons/si";
import Image from "next/image";
import { TbBrandNextjs } from "react-icons/tb";
import { Tooltip } from "@nextui-org/react";

const techStackIconsData = [
  { id: "next", icon: TbBrandNextjs, name: "Nextjs" },
  { id: "react", icon: FaReact, name: "React" },
  { id: "node", icon: FaNodeJs, name: "Node" },
  { id: "express", icon: SiExpress, name: "Express" },
  { id: "typescript", icon: SiTypescript, name: "TypeScript" },
  { id: "javascript", icon: SiJavascript, name: "JavaScript" },
  { id: "mongo", icon: SiMongodb, name: "MongoDB" },
  { id: "mysql", icon: SiMysql, name: "MySQL" },
  { id: "sass", icon: DiSass, name: "SASS" },
  { id: "tailwind", icon: SiTailwindcss, name: "Tailwind CSS" },
];

type Props = {};

const TechIconsHome = (props: Props) => {
  return (
    <>
      {/* <div className="tech-icon">
        <Image src={"/icons/javascript.svg"} alt="" width={48} height={48} />
      </div> */}

      {techStackIconsData.map((t, i) => {
        return (
          <Tooltip content={t.name} className="dark:text-text-light">
            <div className="tech-icon" key={i}>
              {React.createElement(t.icon, {
                size: 48,
                alt: t.id,
                className:
                  "border rounded-full p-0.5 transition-colors duration-300 hover:bg-[#D3D3D3]",
              })}
            </div>
          </Tooltip>
        );
      })}
    </>
  );
};

export default TechIconsHome;
