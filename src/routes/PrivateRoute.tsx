/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";
import { getListPermissions } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { setGrantedPermissions } from "../features/authSlice";

import {
  selectToken,
  selectUser,
  selectGrantedPermissions
} from '../stores/selectors'

interface PrivateRouteProps {
  requiredPermission?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  requiredPermission = "read",
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const grantedPermissions = useAppSelector(selectGrantedPermissions);
  const menuAccess = useMemo(() => user?.list_access || [], [user]);

  const listPermissions = useMemo(() => {
    return getListPermissions(menuAccess, currentPath) || [];
  }, [menuAccess, currentPath]);



  const isAuthenticated = Boolean(token && user);;
  const hasPermission = listPermissions.includes(requiredPermission);

  useEffect(() => {
    const isSameArray = (a: string[], b: string[]) =>
      a.length === b.length && a.every((v, i) => v === b[i]);

    if (!isSameArray(listPermissions, grantedPermissions || []))  {
      dispatch(setGrantedPermissions(listPermissions));
    }
  }, [listPermissions, grantedPermissions, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to={`/login`} state={{ from: location }} replace />;
  }

  

  // Setelah semua hook dipanggil, baru evaluasi
  if (!isAuthenticated) {
    return <Navigate to={`/login`} state={{ from: location }} replace />;
  }

  if (listPermissions.length === 0) {
    return <Navigate to={"/403"} replace />;
  }

  if (listPermissions.length === 0 || !hasPermission)  {
    return <Navigate to={"/403"} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
