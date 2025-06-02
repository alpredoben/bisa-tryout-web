/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAppSelector} from '../stores/hooks'
import { findSlugByPath } from '../utils/helpers';

interface PrivateRouteProps {
  requiredPermission?: string;
}



const PrivateRoute: React.FC<PrivateRouteProps> = ({
  requiredPermission =  'read'
}) => {
  const location = useLocation();
  const {user, token} = useAppSelector((state) => state.auth);

  // Check token login
  if(!token || !user) {
    return <Navigate to={`/login`} state={{from: location}} replace />
  }


  const currentPath = location.pathname;
  const menuAccess = user.list_access || [];

  // Cari menu yang sesuai dengan path
  const matchedMenu = findSlugByPath(menuAccess, currentPath);

  if(!matchedMenu) {
    return <Navigate to={'/403'} replace />
  }

  // Check permission yang dibutuhkan
  const hasPermission = matchedMenu.access_permissions.some((access: any) => access.permission.name === requiredPermission);

  if(!hasPermission) {
    return <Navigate to={'/403'} replace />
  }

  return <Outlet />
}

export default PrivateRoute