/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  PencilIcon,
  PlusIcon,
  TrashBinIcon,
} from "../../assets/icons";

interface I_TreeViewProp {
  listMenu: any[] | [];
  listPermissions: string[];
  onEdit: (data: any) => void;
  onAdd: (data: any) => void;
  onDelete: (data: any) => void;
  onSuccess?: (message: string) => void; 
  refetchData?: () => void;
}

interface I_ItemProp {
  menu: any;
  listPermissions: string[];
  onEdit: (data: any) => void;
  onAdd: (data: any) => void;
  onDelete: (data: any) => void;
  onSuccess?: (message: string) => void; 
  refetchData?: () => void;
}

const TreeMenuItem = ({
  menu,
  listPermissions,
  onEdit,
  onAdd,
  onDelete,
  onSuccess, 
  refetchData
}: I_ItemProp) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li key={menu.menu_id}>
      <div
        className={`flex items-center px-4 py-2 ${
          menu.parent_id != null ? "bg-gray-150" : "bg-slate-200"
        }  text-cyan-950 rounded cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-2 w-3/4">
            {menu.icon ? (
              <img src={menu.icon ? menu.icon.file_url : ''} alt="icon" className="w-4 h-4" />
            ) : null}
            {menu.name}
          </div>
          <div className="flex justify-end w-1/4">
            <div className="flex gap-2">
              {menu.parent_id == null && listPermissions.includes("create") && (<button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => onAdd(menu.menu_id)}>
                <PlusIcon />
              </button>)}

              {listPermissions.includes("update") && (<button className="bg-yellow-500 text-white px-2 py-1 rounded">
                <PencilIcon onClick={() => onEdit(menu.menu_id)} />
              </button>)}
              {listPermissions.includes("delete") && (<button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDelete(menu)}>
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
            onEdit={onEdit}
            onAdd={onAdd}
            onDelete={onDelete}
            onSuccess={onSuccess} 
            refetchData={refetchData}
          />
        </div>
      )}
    </li>
  );
};

export function MenuTreeView({ listMenu, listPermissions, onEdit, onSuccess, refetchData, onAdd, onDelete }: I_TreeViewProp) {
  
  return (
    <ul className="space-y-2">
      {listMenu.map((value: any) => (
        <TreeMenuItem
          key={value.menu_id}
          menu={value}
          listPermissions={listPermissions}
          onEdit={onEdit}
          onAdd={onAdd}
          onDelete={onDelete}
          onSuccess={onSuccess} 
          refetchData={refetchData}
        />
      ))}
    </ul>
  );
}
