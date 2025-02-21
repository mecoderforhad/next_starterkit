import SideBar from "@/components/custom/navigation/SideBar";
import { TopNavBar } from "@/components/custom/navigation/TopNavbar";
import { serverApiCall } from "@/utils/serverApiCall";
import { cookies } from "next/headers";

import React from "react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const sidebarState =
    ((await cookieStore).get("sidebarState")?.value as
      | "collapsed"
      | "expanded") || "expanded";

  const data = await serverApiCall("/menus/list");

  return (
    <>
      <div className="flex">
        <div className="hidden md:block">
          <SideBar initialState={sidebarState} menusData={data}/>
        </div>
        <div className="flex-1 px-5 w-3/4">
          <TopNavBar menusData={data}/>
          {children}
        </div>
      </div>
    </>
  );
}
