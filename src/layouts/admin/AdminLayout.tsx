// File: src/layouts/AdminLayout.tsx

import React from "react";
import { Outlet } from "react-router-dom";
import { useSidebar } from "../../hooks/useSidebar";
import { SidebarProvider } from "../../providers/SidebarProvider";
import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";
import AppHeader from "./AppHeader";


const LayoutContent: React.FC = () => {
  const {isExpanded, isHovered, isMobileOpen} = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        {/* AppSidebar */}
        <Sidebar />

        {/* Backdrop */}
        <Backdrop />
      </div>

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        {/* AppHeader */}
        <AppHeader />

        {/* Outlet */}
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}


export default function AdminLayout() {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  )
}