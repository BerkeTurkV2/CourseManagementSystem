import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import DarkMode from "../components/DarkMode/DarkMode";

function StudentDashboard() {
  return (
    <div className="d-flex">
      <DarkMode />
      <Sidebar userType="student" />
      <div className="flex-grow-1 bg-gradient p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default StudentDashboard;
