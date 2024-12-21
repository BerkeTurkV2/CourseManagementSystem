import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/General/Login/Login';
import MainPanel from './pages/General/MainPanel/MainPanel';
import Calendar from './pages/General/Calendar/Calendar';

import AdminDashboard from './dashboards/AdminDashboard';
import StudentsList from './pages/Admin/StudentsList';
import TeachersList from './pages/Admin/TeachersList';
import ExamsList from './pages/Admin/ExamsList';
import NewUser from './pages/Admin/NewUser';
import NewExam from './pages/Admin/NewExam';

import StudentDashboard from './dashboards/StudentDashboard';
import ExamResult from './pages/Student/ExamResults';
import Profile from './pages/Student/Profile';
import Homeworks from './pages/Student/Homeworks';
import Attendance from './pages/Student/Attendance';
import Appointments from './pages/Student/Appointments';

import TeacherDashboard from './dashboards/TeacherDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} >
          <Route path="mainPanel" element={<MainPanel />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="studentsList" element={<StudentsList />} />
          <Route path="teachersList" element={<TeachersList />} />
          <Route path="examsList" element={<ExamsList />} />
          <Route path="newUser" element={<NewUser />} />
          <Route path="newExam" element={<NewExam />} />
        </Route>
        <Route path='/teacher' element={<TeacherDashboard />}>
        </Route>

        <Route path='/student' element={<StudentDashboard />}>
          <Route path="mainPanel" element={<MainPanel />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="examResults" element={<ExamResult />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="homeworks" element={<Homeworks />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
