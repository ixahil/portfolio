import Setting from '@/components/Admin/setting/Setting';
import { getSiteData } from '@/utils/Admin/fetch/GetSiteData';

const page = async () => {
  const data = await getSiteData();

  return (
    <div className="h-full">
      <h2>Settings</h2>
      <Setting initialValues={data} />
    </div>
  );
};

export default page;
