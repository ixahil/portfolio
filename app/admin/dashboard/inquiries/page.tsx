import { columns } from "@/components/shared/dataTable/InquiryTbColumns";
import { DataTable } from "@/components/shared/dataTable/data-table";
import { getAllInquiries } from "@/utils/fetch/GetProjects";
import React from "react";

type Props = {};

async function page({}: Props) {
  const data = (await getAllInquiries()) || [];

  return <DataTable columns={columns} data={data} />;
}

export default page;
