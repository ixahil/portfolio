import Loading from "@/app/loading";
import { columns } from "@/components/Admin/shared/dataTable/InquiryTbColumns";
import { DataTable } from "@/components/Admin/shared/dataTable/data-table";
import { getAllInquiries } from "@/utils/Admin/fetch/GetProjects";
import React, { Suspense } from "react";

type Props = {};

async function page({}: Props) {
  const data = (await getAllInquiries()) || [];

  return <DataTable columns={columns} data={data} />;
}

export default page;
