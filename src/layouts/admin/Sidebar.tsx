/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useSidebar } from "../../hooks/useSidebar";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useCallback, useEffect } from "react";
import { useAppSelector } from "../../stores/hooks";
import { BoxCubeIcon, ChevronDownIcon, HorizontaLDots, PieChartIcon } from "../../assets/icons";
import type { NavigationItem } from "../../interfaces/appInterface";

const othersItems: NavigationItem[] = [
  {
    menu_name: "Charts",
    menu_slug: "/charts",
    menu_icon: {
      type: "icon",
      value: <PieChartIcon />,
    },
    menu_order_number: 1,
    childrens: [
      {
        menu_name: "Line Chart",
        menu_slug: "/line-chart",
        menu_icon: null,
        menu_order_number: 1,
        childrens: []
      },
      {
        menu_name: "Bar Chart",
        menu_slug: "/bar-chart",
        menu_icon: null,
        menu_order_number: 2,
        childrens: []
      },
    ],
  },
  {
    menu_name: 'UI Elements',
    menu_slug: '/ui-elements',
    menu_icon: {
      type: 'icon',
      value: <BoxCubeIcon />
    },
    menu_order_number: 2,
    childrens: [
      { menu_name: "Alerts", menu_slug: "/alerts", menu_icon: null, menu_order_number: 1, childrens: [] },
      { menu_name: "Avatar", menu_slug: "/avatars", menu_icon: null, menu_order_number: 2, childrens: [] },
      { menu_name: "Badge", menu_slug: "/badge", menu_icon: null , menu_order_number: 3, childrens: [] },
      { menu_name: "Buttons", menu_slug: "/buttons", menu_icon: null, menu_order_number: 4, childrens: [] },
      { menu_name: "Images", menu_slug: "/images", menu_icon: null, menu_order_number: 5, childrens: [] },
      { menu_name: "Videos", 
        menu_slug: "/videos", 
        menu_icon: null, 
        menu_order_number: 6, 
        childrens: [] }
    ],
  }
];

const Sidebar: React.FC = () => {
  const navItems: NavigationItem[] = useAppSelector(
    (state) => state.auth.user?.list_access || []
  );

  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );

  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;

      items.forEach((nav: any, index: any) => {
        
        if(nav?.childrens && nav?.childrens?.length > 0) {
          nav?.childrens?.forEach((ch: any) => {
            if(isActive(ch.menu_slug)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              })
              submenuMatched = true
            }
          })
        } else {
          if(isActive(nav.menu_slug)) {
            setOpenSubmenu({
              type: menuType as "main" | "others",
              index,
            })
            submenuMatched = true
          }
        }        
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu])


  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };


  const getIcon = (icon: {type: string; value: any | null} | null): any | null => {
    if(icon && icon?.type) {
      switch (icon.type) {
        case 'icon':
          return icon.value
        case 'file':
          return icon.value.file_path;
        default:
          return null
      }
    }

    return null
  }


  const renderMenuItems = (items: NavigationItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.menu_name}>
          {nav?.childrens?.length > 0 ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {getIcon(nav.menu_icon)}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.menu_name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
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
                  isActive(nav.menu_slug) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.menu_slug)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {getIcon(nav.menu_icon)}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.menu_name}</span>
                )}
              </Link>
            )
          )}

          {nav?.childrens?.length > 0 && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav?.childrens?.map((subItem) => (
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
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
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
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
