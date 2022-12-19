import { ProSidebarProvider, Sidebar } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";
import Sidebars from "../components/Sidebars";
import Topbar from "../components/Topbar";
import { useState } from "react";

const Layout = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
      <div className="sidebar-thing">
        <Sidebars isSidebar={isSidebar} />
        <div className="w-full">
          <Topbar setIsSidebar={setIsSidebar} />
          <Outlet />
        </div>
      </div>
  );
};

export default Layout;
