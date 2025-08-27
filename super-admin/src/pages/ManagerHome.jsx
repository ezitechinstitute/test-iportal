import React from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { ManagerDashboard } from "../components/ManagerDashboard";

export const ManagerHome = () => {
  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />
      <ManagerDashboard />
    </>
  );
};
