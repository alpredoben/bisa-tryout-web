/* eslint-disable @typescript-eslint/no-explicit-any */


import { format } from 'date-fns';
export const findSlugByPath = (menuList: any[], path: string): any | null => {
  for (const menu of menuList) {
    if (menu.menu_slug === path) return menu;
    if (menu?.childrens && Array.isArray(menu?.childrens) && menu?.childrens?.length > 0) {
      const found = findSlugByPath(menu.childrens, path);
      if (found) return found;
    }
  }
  return null; 
};


export const hasPermission = (
  access: any[],
  permissionKey: string,
  required: string[] = []
): boolean => {
  const menu = findSlugByPath(access, permissionKey);
  if (!menu || !menu.access_permissions) return false;

  const granted = menu.access_permissions.map(
    (perm: any) => perm?.permission?.name
  );

  return required.every((perm) => granted.includes(perm));
};

export const formatedDate = (date: Date, strFormatted: string = 'YYYY-MM-DD') :string => {
  return format(date, strFormatted);
}

export const getListPermissions = (access: any[], path: string): any[] | null => {
  const menu = findSlugByPath(access, path);
  if (!menu || !Array.isArray(menu.access_permissions)) return null;

  if(!menu?.access_permissions) {
    return null
  };

  return menu?.access_permissions?.length > 0 ? menu.access_permissions.map((perm: any) => perm.permission.name) : [];
}


export const formatCurrency = (value: number, strFormat: string = 'id-ID', ): string => {
  return new Intl.NumberFormat(strFormat, {
    // style: "currency",
    // currency: "IDR",
    minimumFractionDigits: 2,
  }).format(value);
};

export const getListModeAnswer = (typeName: any = null): any => {
  const items = [
    {id: 'pilihan-ganda', name: 'Pilihan Berganda'},
    {id: 'benar-salah', name: 'Benar atau Salah'},
    {id: 'multi-seleh', name: 'Lebih dari 1 Pilihan'}
  ];

  if(typeName != null) {
    return items.find((x) => x.id == typeName)
  }
  
  return items
}