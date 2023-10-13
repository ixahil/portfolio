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

const techStackIconsData = [
  { id: "next", icon: TbBrandNextjs },
  { id: "react", icon: FaReact },
  { id: "node", icon: FaNodeJs },
  { id: "express", icon: SiExpress },
  { id: "typescript", icon: SiTypescript },
  { id: "javascript", icon: SiJavascript },
  { id: "mongo", icon: SiMongodb },
  { id: "mysql", icon: SiMysql },
  { id: "sass", icon: DiSass },
  { id: "tailwind", icon: SiTailwindcss },
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
          <div className="tech-icon">
            {React.createElement(t.icon, {
              size: 48,
              alt: t.id,
              className:
                "border rounded-full p-0.5 transition-colors duration-300 hover:bg-[#D3D3D3]",
            })}
          </div>
        );
      })}
    </>
  );
};

export default TechIconsHome;
