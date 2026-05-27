import { useState } from "react";

import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";

export default function DashboardLayout({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-screen z-50
          transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0 lg:static
        `}
      >
        <Sidebar
          closeSidebar={() =>
            setSidebarOpen(false)
          }
        />
      </div>

      <div className="flex-1 overflow-y-auto">

        <Topbar
          title={title}
          subtitle={subtitle}
          buttonText={buttonText}
          onClick={onButtonClick}
          toggleSidebar={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        {children}

      </div>

    </div>
  );
}