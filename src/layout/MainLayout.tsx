import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen bg-dark-color">
      <Outlet />
    </div>
  );
};

export default MainLayout;
