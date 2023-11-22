'use client';

import classNames from 'classnames';
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import localFont from 'next/font/local';

import { IconLogout, CollapsIcon } from '@/utils/Admin/shared/icons/SidebarIcons';
import { menuItems } from '@/utils/Admin/shared/menu/MenuItems';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

type MenuInterface = {
  id: number; // lowercase 'number', not 'Number'
  label: string; // lowercase 'string', not 'String'
  link: string;
};

// const AgustinaRegular = localFont({ src: "/fonts/Agustina.woff" });
const AgustinaRegular = localFont({
  src: [
    {
      path: '../../../../public/fonts/Agustina.woff',
      weight: 'normal',
      style: 'normal'
    }
  ]
});

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const pathname = usePathname();

  const activeMenu = useMemo(() => menuItems.find((menu) => menu.link === pathname), [pathname]);

  const wrapperClasses = classNames(
    'px-4 pt-8 pb-4 bg-light flex justify-between flex-col md:w-20 dark:bg-dark border-r-2 border-light-lighter dark:border-dark-lighter h-full',
    {
      'w-50': !toggleCollapse,
      'w-20': toggleCollapse
    }
  );

  const collapseIconClasses = classNames(
    'p-4 rounded bg-light-lighter absolute right-0 dark:bg-[#282828] shadow-md',
    {
      'rotate-180': toggleCollapse
    }
  );

  const getNavItemClasses = (menu: Partial<MenuInterface> = {}) => {
    return classNames(
      'flex items-center cursor-pointer hover:bg-light-lighter rounded-lg w-full overflow-hidden whitespace-nowrap dark:hover:bg-[#282828]',
      {
        ['bg-light-lighter dark:bg-[#282828]']: activeMenu?.id === menu.id
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <aside className="shadow-xl dark:shadow-lg dark:shadow-[#27272a]">
      <div
        className={`${wrapperClasses} shadow-lg	dark:shadow-lg dark:shadow-[#27272a]`}
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouseOver}
      >
        <div className="flex flex-col">
          <div className="relative flex flex-col items-center justify-between gap-4">
            <div className="flex items-center gap-4 pl-1">
              <div className="h-auto w-auto">
                <Image
                  src="/logo.png"
                  height={75}
                  width={75}
                  alt="logo"
                  className="h-auto w-auto"
                />
              </div>
              {isCollapsible && (
                <button className={collapseIconClasses} onClick={handleSidebarToggle}>
                  <CollapsIcon />
                </button>
              )}
            </div>
            <span
              className={classNames(
                `mt-2 text-3xl font-bold text-dark dark:text-light md:hidden ${AgustinaRegular.className}`,
                {
                  hidden: toggleCollapse
                }
              )}
            >
              Dev. Sahil
            </span>
          </div>

          <div className="mt-8 flex flex-col items-start gap-2">
            {menuItems.map((menuItem, index) => {
              const { icon: Icon, ...menu } = menuItem; // Destructure each menuItem
              const classes = getNavItemClasses(menu);
              return (
                <div className={classes} key={index}>
                  <Link href={menu.link} className="flex items-center px-3 py-4">
                    <div style={{ width: '2.5rem' }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          'text-md font-medium text-dark dark:text-light md:hidden'
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        {}
        {/* <div className={`${getNavItemClasses({})} px-3 py-4`}>
        <div style={{ width: "2.5rem" }}>
          <LogoutIcon />
        </div>
        {!toggleCollapse && (
          <span
            className={classNames(
              "text-md font-medium text-text-light md:hidden"
            )}
          >
            Logout
          </span>
        )}
      </div> */}

        <div className={`${getNavItemClasses({})}`}>
          <Link
            href={'/'}
            className="flex items-center px-3 py-4 dark:bg-dark hover:dark:bg-[#282828]"
          >
            <div style={{ width: '2.5rem' }}>
              <IconLogout />
            </div>
            {!toggleCollapse && (
              <span
                className={classNames('text-md font-medium text-dark dark:text-light md:hidden')}
              >
                {'Logout'}
              </span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
