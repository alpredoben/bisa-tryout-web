/* eslint-disable react-hooks/exhaustive-deps */
import type React from "react";
import { useSidebar } from "../hooks/useSidebar";
import { useEffect, useState } from "react";

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isExpanded, toggleMobileSidebar } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && isMobile) {
        toggleMobileSidebar();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggleMobileSidebar]);



  return (
    <div className={isMobile ? "mobile-sidebar" : isExpanded ? "expanded-sidebar" : "collapsed-sidebar"}>
      {children}
    </div>
  );
};
