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

const techStackIconsData = [
  { id: "node", icon: FaNodeJs },
  { id: "react", icon: FaReact },
  { id: "express", icon: SiExpress },
  { id: "mongo", icon: SiMongodb },
  { id: "mysql", icon: SiMysql },
  { id: "sass", icon: DiSass },
  { id: "tailwind", icon: SiTailwindcss },
  { id: "postgresql", icon: SiPostgresql },
  { id: "typescript", icon: SiTypescript },
  { id: "javascript", icon: SiJavascript },
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
      <div className="tech-icon">
        {React.createElement(IconComponent, {
          size: 48, // Adjust the icon size as needed
          className:
            "border rounded p-1 transition-colors duration-300 hover:bg-[#D3D3D3] ",
        })}
      </div>
    );
  }

  return null; // Return null if no matching icon is found
};

export default TechStackIcon;
