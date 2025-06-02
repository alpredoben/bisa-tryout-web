import { useEffect } from "react";
import { BreadCrumb } from "../../components/common/BreadCrumb";
import { PageMeta } from "../../components/common/PageMeta";

// File: src/pages/Dashboard.tsx
const DashboardPage: React.FC = () => {
  useEffect(() => {
    console.log("DashboardPage Mounted");
  }, []);

  return (
    <>
      <PageMeta
        title="Dashboard"
        description="This is role page in admin panel"
      />

      <BreadCrumb pageTitle="Dashboard" />
      <p className="text-gray-600">Selamat datang di halaman dashboard.</p>
    </>
  );
};

export default DashboardPage;
