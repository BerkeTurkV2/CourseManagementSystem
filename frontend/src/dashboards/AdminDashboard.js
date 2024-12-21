import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import DarkMode from "../components/DarkMode/DarkMode";

function AdminDashboard() {
  return (
    <div className="d-flex">
      <DarkMode />
      <Sidebar userType="admin" />
      <div className="flex-grow-1 bg-gradient p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
