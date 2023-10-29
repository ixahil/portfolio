import {
  IconHome,
  IconInquiry,
  IconProjects,
  IconSetting,
} from "../icons/SidebarIcons";

export type MenuItem = {
  id: number; // lowercase 'number', not 'Number'
  label: string; // lowercase 'string', not 'String'
  icon: React.ElementType; // Use React.ElementType for a React component
  link: string;
};

export const menuItems: MenuItem[] = [
  { id: 1, label: "Dashboard", icon: IconHome, link: "/admin/dashboard/home" },
  {
    id: 2,
    label: "Manage Projects",
    icon: IconProjects,
    link: "/admin/dashboard/projects",
  },
  {
    id: 3,
    label: "Manage Inquiries",
    icon: IconInquiry,
    link: "/admin/dashboard/inquiries",
  },
  {
    id: 4,
    label: "Admin Settings",
    icon: IconSetting,
    link: "/admin/dashboard/setting",
  },
];
