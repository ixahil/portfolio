import { getSingleProject } from "../../api/GetData";

const page = async ({ params }: { params: { slug: string } }) => {
  const data = (await getSingleProject(params.slug)) || [];

  return <div>{data.title}</div>;
};

export default page;
