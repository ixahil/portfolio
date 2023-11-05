import { columns } from "@/components/Admin/shared/dataTable/ProjectTbColumns";
import { DataTable } from "@/components/Admin/shared/dataTable/data-table";
import { getAllProjects } from "@/utils/Admin/fetch/GetProjects";
import React, { Suspense } from "react";

type Props = {};

async function page({}: Props) {
  const data = (await getAllProjects()) || [];

  return <DataTable columns={columns} data={data} />;
}

export default page;
