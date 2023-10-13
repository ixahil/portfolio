import React, { useEffect, useState } from "react";
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
import { useFormContext } from "@/context/FormContext";

type Props = {
  initialValue: [];
};

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

function TechStackIcons() {
  const { formData, updateFormData } = useFormContext();

  // Initialize local state with selectedTech from formData
  const [selectedIcons, setSelectedIcons] = useState<string[]>(
    formData.selectedTech
  );

  const isIconSelected = (iconId: string) => {
    return formData.selectedTech.includes(iconId);
  };

  const handleIconClick = (iconId: string) => {
    const updatedSelectedTech = isIconSelected(iconId)
      ? selectedIcons.filter((id) => id !== iconId)
      : [...selectedIcons, iconId];

    setSelectedIcons(updatedSelectedTech as []);

    updateFormData({
      ...formData,
      selectedTech: updatedSelectedTech,
    });
  };

  return (
    <fieldset className="mb-4">
      <legend className="block text-gray-600">Choose Tech Stack:</legend>
      <div className="space-y-2 flex flex-wrap gap-2">
        {techStackIconsData.map((tech) => (
          <div className="flex items-center mt-2" key={tech.id}>
            <label
              htmlFor={tech.id}
              className={`cursor-pointer rounded p-1 transition-colors duration-300 ${
                isIconSelected(tech.id)
                  ? "bg-gray-200 dark:bg-dark-lighter"
                  : ""
              }`}
              onClick={() => handleIconClick(tech.id)}
            >
              {React.createElement(tech.icon, {
                size: 40, // Reduce the icon size for smaller screens
                className:
                  "border rounded p-1 transition-colors duration-300 hover:bg-gray-200",
              })}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default TechStackIcons;
