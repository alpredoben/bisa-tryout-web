import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

// Pages
import { LandingPage } from "./pages/landing";
import { LoginPage, RegisterPage } from "./pages/auth";
import { DashboardPage } from "./pages/dashboard";
import { ProfilePage } from "./pages/profile";
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
import { TryoutPackage } from "./pages/tryout-package";
import { HistoryTryoutPage } from "./pages/history-tryout";
import { OrganizationPage } from "./pages/organization";
import { TryoutCategoryPage } from "./pages/tryout-category";
import { TryoutStagePage } from "./pages/tryout-stage";
import { TryoutTypePage } from "./pages/tryout-type";

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
          style={{ zIndex: 99999 }}
        />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />
            }
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
          />

          <Route path="/403" element={<ForbiddenPage />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route element={<AdminLayout />}>
            <Route
              path="/dashboard"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route index element={<DashboardPage />} />
            </Route>

            <Route
              path="/profile"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route index element={< ProfilePage />} />
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

            {/* Master User */}
            <Route
              path="/master-user"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route index element={<UserPage />} />
            </Route>

            {/* Organization */}
            <Route
              path="/organization"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route index element={<OrganizationPage />} />
            </Route>

            {/* Tryout Category */}
            <Route
              path="/tryout-categories"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route index element={<TryoutCategoryPage />} />
            </Route>

            {/* Tryout Stage */}
            <Route
              path="/tryout-stages"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route index element={<TryoutStagePage />} />
            </Route>

            {/* Tryout Type */}
            <Route
              path="/tryout-types"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route index element={<TryoutTypePage />} />
            </Route>

            <Route
              path="/tryout-packages"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route index element={<TryoutPackage />} />
            </Route>

            <Route
              path="/history-import-tryout"
              element={<PrivateRoute requiredPermission="read" />}
            >
              <Route
                index
                element={<HistoryTryoutPage />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
