import { columns } from "@/components/shared/dataTable/ProjectTbColumns";
import { DataTable } from "@/components/shared/dataTable/data-table";
import { getAllProjects } from "@/utils/fetch/GetProjects";
import React from "react";

type Props = {};

async function page({}: Props) {
  const data = (await getAllProjects()) || [];

  return <DataTable columns={columns} data={data} />;
}

export default page;
