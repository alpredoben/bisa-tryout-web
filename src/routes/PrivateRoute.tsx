/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";
import { getListPermissions } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { setGrantedPermissions } from "../features/authSlice";

interface PrivateRouteProps {
  requiredPermission?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  requiredPermission = "read",
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const auth = useAppSelector((state) => state.auth);

  const menuAccess = auth?.user?.list_access || [];
  const grantPermissions = auth?.grantedPermissions;

  const listPermissions = useMemo(() => {
    return getListPermissions(menuAccess, currentPath) || [];
  }, [menuAccess, currentPath]);

  const isAuthenticated = auth?.token && auth?.user;
  const hasPermission = listPermissions.includes(requiredPermission);

  // Check token login
  if (!auth?.token || !auth?.user) {
    return <Navigate to={`/login`} state={{ from: location }} replace />;
  }

  // Selalu jalankan hook
  useEffect(() => {
    const isSame =
      JSON.stringify(listPermissions) === JSON.stringify(grantPermissions);
    if (!isSame) {
      dispatch(setGrantedPermissions(listPermissions));
    }
  }, [listPermissions, grantPermissions, dispatch]);

  // Setelah semua hook dipanggil, baru evaluasi
  if (!isAuthenticated) {
    return <Navigate to={`/login`} state={{ from: location }} replace />;
  }

  if (listPermissions.length === 0) {
    return <Navigate to={"/403"} replace />;
  }

  if (!hasPermission) {
    return <Navigate to={"/403"} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
