import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Check, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Row } from "@tanstack/react-table";
import { Projects } from "./columns";

export const getActions = ({ row }: { row: Row<Projects> }) => {
  const router = useRouter();
  const project = row.original;

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
          onClick={() =>
            router.push("/admin/dashboard/projects/edit/" + project._id)
          }
          className="cursor-pointer hover:bg-light-lighter"
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-[#d11a2a]">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
