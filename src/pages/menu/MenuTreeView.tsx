/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  PencilIcon,
  TrashBinIcon,
} from "../../assets/icons";

interface I_TreeViewProp {
  listMenu: any[] | [];
  listPermissions: string[] | [];
}

const TreeMenuItem = ({
  menu,
  listPermissions,
}: {
  menu: any;
  listPermissions: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li key={menu.menu_id}>
      <div
        className={`flex items-center px-4 py-2 ${
          menu.parent_id != null ? "bg-gray-150" : "bg-slate-200"
        }  text-cyan-950 rounded cursor-pointer`}
        onClick={() => {console.log('Clickked'); setIsOpen(!isOpen)}}
      >
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-2 w-3/4">
            {menu.icon ? (
              <img src={menu.icon} alt="icon" className="w-4 h-4" />
            ) : null}
            {menu.name}
          </div>
          <div className="flex justify-end w-1/4">
            <div className="flex gap-2">
              {listPermissions.includes("update") && (<button className="bg-yellow-500 text-white px-2 py-1 rounded">
                <PencilIcon />
              </button>)}
              {listPermissions.includes("delete") && (<button className="bg-red-500 text-white px-2 py-1   rounded">
                <TrashBinIcon />
              </button>)}
              {menu.parent_id == null && menu.childrens?.length > 0 && (
                <button className="bg-gray-500 text-white px-2 py-2 rounded">
                  {isOpen ? <ArrowDownIcon /> : <ArrowRightIcon />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpen && menu.childrens.length > 0 && (
        <div className="ml-6 mt-2">
          <MenuTreeView
            listMenu={menu.childrens}
            listPermissions={listPermissions}
          />
        </div>
      )}
    </li>
  );
};

export function MenuTreeView({ listMenu, listPermissions }: I_TreeViewProp) {
  return (
    <ul className="space-y-2">
      {listMenu.map((value: any) => (
        <TreeMenuItem
          key={value.menu_id}
          menu={value}
          listPermissions={listPermissions}
        />
      ))}
    </ul>
  );
}
