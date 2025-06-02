/* eslint-disable @typescript-eslint/no-explicit-any */


import { format } from 'date-fns';
export const findSlugByPath = (menuList: any[], path: string): any | null => {
  for (const menu of menuList) {
    if (menu.menu_slug === path) return menu;
    if (menu?.childrens && menu?.childrens?.length > 0) {
      const found = findSlugByPath(menu.childrens, path);
      if (found) return found;
    }
  }
  return null; 
};


export const hasPermission = (access: any[], permissionKey: string, required: string[] = []) => {
  const menu = findSlugByPath(access, permissionKey);
  if (!menu || !menu.access_permissions) return false;

  const granted = menu.access_permissions.map((perm: any) => perm.permission.name);
  return required.every((r) => granted.includes(r));
};


export const formatedDate = (date: Date, strFormatted: string = 'YYYY-MM-DD') :string => {
  return format(date, strFormatted);
}
