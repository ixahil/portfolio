"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MailOpen, MailWarning, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/Admin/ui/button";
import { Button as NextButton } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/Admin/ui/dropdown-menu";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import toast from "react-hot-toast";
import { useDisclosure } from "@nextui-org/react";
import Modal from "../modal/Modal";

// types
export type Inquiry = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: boolean;
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

// Actions for Every Row
const getActions = ({ row }: { row: Row<Inquiry> }) => {
  const router = useRouter();
  const inquiry = row.original;

  const deleteInquiry = async (id: string) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_V1 + "delete-inquiry/" + id,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      console.log(res);

      if (res.status === 200) {
        router.refresh();
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchDataWithToast = async () => {
    return toast.promise(deleteInquiry(inquiry._id), {
      loading: "Deleting...", // Message shown while loading
      success: "Project Deleted Successfully!", // Shown on success
      error: "Error Deleting Project!", // Shown on error
    });
  };

  const updateInquiryStatus = async (id: string, status: boolean) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_V1 + "update-inquiry/" + id,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json", // Specify JSON content type
          },
          body: JSON.stringify({ status: status }), // Convert object to JSON string
        }
      );

      if (res.status === 200) {
        router.refresh();
        console.log(await res.json());
      } else {
        throw new Error("Failed to update inquiry");
      }
    } catch (error) {
      throw error;
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(inquiry.status);

  useEffect(() => {
    if (inquiry.status !== status) {
      updateInquiryStatus(inquiry._id, status);
    }
  }, [status]);

  const modalTitle = `Inquiry from ${inquiry.name} | ${inquiry.email}`;
  const modalContent = (
    <div className="p-4">
      <div className="mb-4">
        <div className="text-lg font-bold">{inquiry.subject}</div>
        <div className="text-gray-600 mb-2">
          From: {inquiry.name} &lt;{inquiry.email}&gt;
        </div>
        <div className="border-t border-b border-gray-300 py-2 mb-2">
          <div className="p-4 rounded-lg bg-gray-100">
            <div>{inquiry.message}</div>
          </div>
        </div>
      </div>
      <div className="text-gray-600">
        Sent: {new Date(inquiry.createdAt).toLocaleString()}
      </div>
    </div>
  );

  const modelFooter = (
    <>
      <NextButton
        color="danger"
        variant="light"
        onPress={() => {
          setIsModalOpen(false);
          setStatus(true);
        }}
      >
        Close
      </NextButton>
      <NextButton
        color="primary"
        onPress={() => {
          setIsModalOpen(false);
          setStatus(false);
        }}
      >
        Mark as Unread
      </NextButton>
    </>
  );

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setStatus(true);
        }}
        title={modalTitle}
        content={modalContent}
        footer={modelFooter}
        size="3xl"
      />
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
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer hover:bg-[#d11a2a]"
          >
            Open
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => fetchDataWithToast()}
            className="cursor-pointer hover:bg-[#d11a2a]"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

// Table Columns
export const columns: ColumnDef<Inquiry>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Inquiry Date" />;
    },
    cell: ({ cell }) => getDate({ cell }),
  },
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Subject" />;
    },
  },
  {
    accessorKey: "message",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Message" />;
    },
    cell: ({ cell }) => {
      const message = cell.getValue() as string;
      return (
        <div className="max-h-12 overflow-hidden text-ellipsis whitespace-nowrap">
          {message}
        </div>
      );
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
        <div className="flex items-center">
          {status ? (
            <>
              <MailOpen size={25} className="mr-4" />
              <span className="border-l-[6px] border-[#4BB543] pl-2">
                Opened!
              </span>
            </>
          ) : (
            <>
              <MailWarning size={25} className="mr-4" />
              <span className="border-l-[6px] border-[#F7CB73] pl-2">New</span>
            </>
          )}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => getActions({ row }),
  },
];
