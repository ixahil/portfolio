"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import Image from "next/image";
import { publicAPI } from "@/utils/constants/constants";
import { techStackIconsData } from "@/utils/shared/icons/TechIcons";
import toast from "react-hot-toast";

// types
export type Projects = {
  thumbnail: {
    public_id: string;
    imageURL: string;
  };
  _id: string;
  title: string;
  description: string;
  htmlDescription: string;
  images: {
    imageName: string;
    imageURL: string;
    _id: string;
  };
  selectedTech: [string];
  status: "true" | "false";
  createdDate: string;
  createdAt: string;
  updatedAt: string;
};

// Date Converting
const getDate = <TData, TValue>({
  cell,
}: {
  cell: { getValue: () => TValue };
}): string => {
  const dateString = cell.getValue() as Date;
  const dateObj = new Date(dateString);
  return dateObj.toDateString();
};

// Icons Mapping and creating
const getIcons = <TData, TValue>({
  cell,
}: {
  cell: { getValue: () => TValue };
}) => {
  const Techs = cell.getValue() as [string];
  const filteredTechstack = techStackIconsData.filter((tech) =>
    Techs.includes(tech.id)
  );
  return (
    <div className="flex gap-2 flex-wrap md:gap-0">
      {filteredTechstack.map((T, index) => (
        <div key={index}>
          {React.createElement(T.icon, {
            size: 30,
            alt: T.id,
            className:
              "border rounded-full p-0.5 transition-colors duration-300 hover:bg-[#D3D3D3] md:text-lg",
          })}
        </div>
      ))}
    </div>
  );
};

// Actions for Every Row
const getActions = ({ row }: { row: Row<Projects> }) => {
  const router = useRouter();
  const project = row.original;

  const deleteProject = async (id: string) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_V1 + "delete-project/" + id,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.status === 200) {
        router.refresh();
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleEditProject = (id: string) => {
    router.push(`/admin/dashboard/projects/edit/${id}`);
    toast.loading("loading..");
    setTimeout(() => {
      toast.dismiss();
    }, 500);
  };

  const fetchDataWithToast = async () => {
    return toast.promise(deleteProject(project._id), {
      loading: "Deleting...", // Message shown while loading
      success: "Project Deleted Successfully!", // Shown on success
      error: "Error Deleting Project!", // Shown on error
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => handleEditProject(project._id)}
          className="cursor-pointer hover:bg-light-lighter"
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => fetchDataWithToast()}
          className="cursor-pointer hover:bg-[#d11a2a]"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Table Columns
export const columns: ColumnDef<Projects>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Title" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ cell }) => {
      const status = cell.getValue();
      return (
        <div className="flex items-center justify-center">
          {status ? <Check size={20} /> : <X size={20} />}
        </div>
      );
    },
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created Date" />;
    },
    cell: ({ cell }) => getDate({ cell }),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Modified Date" />;
    },
    cell: ({ cell }) => getDate({ cell }),
  },
  {
    accessorKey: "thumbnail.imageURL",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Image" />;
    },
    id: "thumbnail",
    cell({ cell, row, column }) {
      const imageURL = cell.getValue() as string;
      return (
        <div className="inline-block md:max-w-[250px]">
          <Image
            src={imageURL}
            alt={row.original.thumbnail.public_id}
            className="dark:brightness-[.45] object-contain"
            width={500}
            height={200}
          />
        </div>
      );
    },
  },

  {
    accessorKey: "selectedTech",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Techs" />;
    },
    cell: ({ cell }) => getIcons({ cell }),
    // cell({ cell }) {
    //   const techs = cell.getValue() as string[]; // Assuming 'techs' is an array of strings
    //   return (
    //     <div className="gap-2 flex flex-wrap max-w-[250px]">
    //       {techs.map((tech, index) => (
    //         <div
    //           key={index}
    //           className=" bg-[#e5e7eb] dark:bg-[#282828] rounded-md p-2 cursor-pointer"
    //         >
    //           {tech}
    //         </div>
    //       ))}
    //     </div>
    //   );
    // },
  },

  {
    id: "actions",
    cell: ({ row }) => getActions({ row }),

    // cell: ({ row }) => {
    //   const router = useRouter();
    //   const project = row.original;

    //   return (
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild>
    //         <Button variant="ghost" className="h-8 w-8 p-0">
    //           <span className="sr-only">Open menu</span>
    //           <MoreHorizontal className="h-4 w-4" />
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align="end">
    //         <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //         <DropdownMenuItem
    //           onClick={() =>
    //             router.push("/admin/dashboard/projects/edit/" + project._id)
    //           }
    //           className="cursor-pointer hover:bg-light-lighter"
    //         >
    //           Edit
    //         </DropdownMenuItem>
    //         <DropdownMenuItem className="cursor-pointer hover:bg-[#d11a2a]">
    //           Delete
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   );
    // },
  },
];
