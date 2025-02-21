"use client";

import { setSidebarState } from "@/lib/actions/sidebar";
import { Sidebar } from "flowbite-react";
import { useState } from "react";
import { HiChartPie, HiMenuAlt3 } from "react-icons/hi";

interface SidebarProps {
  initialState: "collapsed" | "expanded";
  menusData: {
    id: number;
    title: string;
    submenus?: {
      id: number;
      title: string;
    }[];
  }[];
}

export default function SideBar({ initialState, menusData }: SidebarProps) {
  const [state, setState] = useState<"collapsed" | "expanded">(initialState);

  const toggleSidebar = async () => {
    const newState = state === "collapsed" ? "expanded" : "collapsed";
    setState(newState);
    await setSidebarState(newState);
  };

  return (
    <div className="h-full shadow-md">
      <Sidebar
        collapsed={state === "collapsed" ? false : true}
        aria-label="Sidebar with multi-level dropdown example"
      >
        <div
          className={`${
            state === "expanded" ? "block" : "flex items-center justify-between"
          }`}
        >
          <Sidebar.Logo
            href="#"
            img="/logo.png"
            imgAlt="Flowbite logo"
            className="py-2"
          >
            Ecommerce
          </Sidebar.Logo>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer m-2 mb-5 hidden md:block dark:text-white"
            onClick={toggleSidebar}
          />
        </div>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {menusData?.map((menu) =>
              menu?.submenus && menu.submenus.length > 0 ? (
                <Sidebar.Collapse
                  key={menu?.id}
                  icon={HiChartPie}
                  label={menu?.title}
                >
                  {menu?.submenus?.map((submenu) => (
                    <Sidebar.Item key={submenu?.id} href="#">
                      {submenu?.title}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              ) : (
                <Sidebar.Item key={menu?.id} href="#" icon={HiChartPie}>
                  {menu?.title}
                </Sidebar.Item>
              )
            )}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
