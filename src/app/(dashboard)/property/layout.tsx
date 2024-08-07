import React from "react";
import Sidebar from "@/components/layout/sidebar/Sidebar";

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
