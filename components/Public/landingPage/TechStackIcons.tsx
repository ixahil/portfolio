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
import { Tooltip } from "@nextui-org/react";

const techStackIconsData = [
  { id: "node", icon: FaNodeJs, name: "Node" },
  { id: "react", icon: FaReact, name: "React" },
  { id: "express", icon: SiExpress, name: "Express" },
  { id: "mongo", icon: SiMongodb, name: "MongoDB" },
  { id: "mysql", icon: SiMysql, name: "MySQL" },
  { id: "sass", icon: DiSass, name: "SASS" },
  { id: "tailwind", icon: SiTailwindcss, name: "Tailwind CSS" },
  { id: "postgresql", icon: SiPostgresql, name: "Postgre SQL" },
  { id: "typescript", icon: SiTypescript, name: "TypeScript" },
  { id: "javascript", icon: SiJavascript, name: "JavaScript" },
];

interface TechStackIconProps {
  tech: string;
}

const TechStackIcon = ({ tech }: TechStackIconProps) => {
  // Find the corresponding icon object in techstackiconsdata
  const techIcon = techStackIconsData.find((icon) => icon.id === tech);

  // Check if a matching icon is found
  if (techIcon) {
    const IconComponent = techIcon.icon;

    return (
      <Tooltip
        content={techIcon.name}
        className="text-text-dark dark:text-light"
      >
        <div className="tech-icon">
          {React.createElement(IconComponent, {
            size: 48, // Adjust the icon size as needed
            className:
              "border rounded p-1 transition-colors duration-300 hover:bg-[#D3D3D3] ",
          })}
        </div>
      </Tooltip>
    );
  }

  return null; // Return null if no matching icon is found
};

export default TechStackIcon;
