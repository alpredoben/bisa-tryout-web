import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

// Pages
import { LandingPage } from "./pages/landing";
import { LoginPage, RegisterPage } from "./pages/auth";
import { DashboardPage } from "./pages/dashboard";
import ForbiddenPage from "./pages/ForbiddenPage";
import PrivateRoute from "./routes/PrivateRoute";
import AdminLayout from "./layouts/admin/AdminLayout";
import NotFoundPage from "./pages/NotFoundPage";
import { RolePage } from "./pages/roles";
import { PermissionPage } from "./pages/permissions";
import { UserPage } from "./pages/users";

import { ScrollToTop } from "./components/common/ScrollToTop";
import { useSelector } from "react-redux";
import type { RootState } from "./stores/rootReducer";
import { MenuPage } from "./pages/menu";

const App = () => {
   // Mengambil status autentikasi dari Redux store
   const token = useSelector((state: RootState) => state.auth.token);
   const isAuthenticated = !!token; 

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          transition={Slide}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="!z-[99999]"
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />
          
          <Route path="/403" element={<ForbiddenPage />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route element={<AdminLayout />}>
            <Route
              path="/dashboard"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route index element={<DashboardPage />} />
            </Route>

            {/* Configuration */}
            <Route
              path="/master-role"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route index element={<RolePage />} />
            </Route>

            <Route
              path="/master-menu"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route index element={<MenuPage />} />
            </Route>

            <Route
              path="/master-permission"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route index element={<PermissionPage />} />
            </Route>

            <Route
              path="/master-user"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route index element={<UserPage />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
