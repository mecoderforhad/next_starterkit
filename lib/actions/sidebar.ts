"use server";

import { cookies } from "next/headers";

export async function setSidebarState(state: "collapsed" | "expanded") {
  const cookieStore = cookies();
  (await cookieStore).set("sidebarState", state, { path: "/", maxAge: 60 * 60 * 24 * 7 });
}
