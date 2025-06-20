/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";
import { setGrantedPermissions } from "../features/authSlice";

import {
  selectToken,
  selectUser,
  selectGrantedPermissions,
} from "../stores/selectors";
import { useAppDispatch } from "../stores";
import { FullScreenLoader } from "../components/common/FullScreenLoader";
import { getListPermissions } from "../utils/helpers";

interface PrivateRouteProps {
  requiredPermission?: string;
  children?: React.ReactNode; // ✅ tambahkan ini
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  requiredPermission = "read",
  children
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const grantedPermissions = useAppSelector(selectGrantedPermissions);

  const [isReady, setIsReady] = useState(false);

  const menuAccess = useMemo(() => user?.list_access || [], [user]);
  const currentPath = location.pathname;

  // Ambil path prefix berdasarkan route pertama (misal /tryout-packages/view → /tryout-packages)
  const matchedMenu = useMemo(() => {
    const segments = currentPath.split("/").filter(Boolean); // ['tryout-packages', 'view']
    if (segments.length === 0) {
      return null
    };
    const basePath = "/" + segments[0]; // → "/tryout-packages"
    return getListPermissions(menuAccess, basePath);
  }, [menuAccess, currentPath]);

  const listPermissions = matchedMenu || [];

  const isAuthenticated = Boolean(token && user);
  const hasPermission = listPermissions.includes(requiredPermission);

  useEffect(() => {
    if (token && user) {
      // Jika grantedPermissions berbeda dari listPermissions → update redux
      const isSameArray = (a: string[], b: string[]) =>
        a.length === b.length && a.every((v, i) => v === b[i]);

      if (!isSameArray(listPermissions, grantedPermissions || [])) {
        dispatch(setGrantedPermissions(listPermissions));
      }

      // Beri delay satu tick render sebelum lanjut render konten
      setTimeout(() => setIsReady(true), 0);
    }
  }, [token, user, listPermissions, grantedPermissions, dispatch]);

  // Handle loading state
  if (!isReady) {
    return <FullScreenLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  if (listPermissions.length === 0 || !hasPermission) {
    return <Navigate to="/403" replace />;
  }

  return <>{children || <Outlet />}</>;
};

export default PrivateRoute;
