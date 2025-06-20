/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useSidebar } from "../../hooks/useSidebar";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useCallback, useEffect } from "react";
import { useAppSelector } from "../../stores/hooks";
import {
  ChevronDownIcon
} from "../../assets/icons";
import type { NavigationItem } from "../../interfaces/appInterface";
import { selectUserListAccess } from "../../stores/selectors";


const Sidebar: React.FC = () => {
  const navItems: NavigationItem[] = useAppSelector(selectUserListAccess);

  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );

  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = useCallback(
  //   (path: string) => location.pathname === path,
  //   [location.pathname]
  // );

  const isActive = useCallback(
    (path: string) => location.pathname === path || location.pathname.startsWith(path + "/"),
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;

    navItems.forEach((nav: any, index: any) => {
        if (nav?.childrens && nav?.childrens?.length > 0) {
          nav.childrens.forEach((ch: any) => {
            if (isActive(ch.menu_slug)) {
              setOpenSubmenu({
                index,
              });
              submenuMatched = true;
            }
          });
        } else if (isActive(nav.menu_slug)) {
          setOpenSubmenu({
            index,
          });
          submenuMatched = true;
        }
      });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `menu-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { index };
    });
  };

  const getIcon = (
    icon: { type: string; value: any | null } | null
  ): any | null => {
    if (icon && icon?.type) {
      switch (icon.type) {
        case "icon":
          return icon.value;
        case "file":
          return icon.value.file_path;
        default:
          return null;
      }
    }

    return null;
  };

  const renderMenuItems = (
    items: NavigationItem[],
  ) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => nav.is_sidebar === true && (
        <li key={nav.menu_name}>
          {nav?.childrens?.length > 0 ? (
            <button
              onClick={() => handleSubmenuToggle(index)}
              className={`menu-item group ${
                openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              {/* <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {getIcon(nav.menu_icon)}
              </span> */}
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.menu_name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-700"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.menu_slug && (
              <Link
                to={nav.menu_slug}
                className={`menu-item group ${
                  isActive(nav.menu_slug)
                    ? "menu-item-active"
                    : "menu-item-inactive"
                }`}
              >
                {/* <span
                  className={`menu-item-icon-size ${
                    isActive(nav.menu_slug)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {getIcon(nav.menu_icon)}
                </span> */}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.menu_name}</span>
                )}
              </Link>
            )
          )}

          {nav?.childrens?.length > 0 &&
            (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[`menu-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height:
                    openSubmenu?.index === index
                      ? `${subMenuHeight[`menu-${index}`]}px`
                      : "0px",
                }}
              >
                <ul className="mt-2 space-y-1 ml-9">
                  {nav?.childrens?.map((subItem) => subItem.is_sidebar == true &&  (
                    <li key={subItem.menu_name}>
                      <Link
                        to={subItem.menu_slug}
                        className={`menu-dropdown-item ${
                          isActive(subItem.menu_slug)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.menu_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-teal-200 dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-emerald-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/dashboard">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
