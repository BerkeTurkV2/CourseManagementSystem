import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';

import AdminDashboard from './dashboards/AdminDashboard';
import MainPanel from './components/MainPanel/MainPanel';
import StudentsList from './pages/StudentsList/StudentsList';
import TeachersList from './pages/TeachersList/TeachersList';
import ExamsList from './pages/ExamsList/ExamsList';

import NewUser from './pages/NewUser/NewUser';
import NewExam from './pages/NewExam/NewExam';

import TeacherDashboard from './dashboards/TeacherDashboard';
import StudentDashboard from './dashboards/StudentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/admin" element={<AdminDashboard />} >
          <Route path="mainPanel" element={<MainPanel />} />
          <Route path="studentsList" element={<StudentsList />} />
          <Route path="teachersList" element={<TeachersList />} />
          <Route path="examsList" element={<ExamsList />} />
          <Route path="newUser" element={<NewUser />} />
          <Route path="newExam" element={<NewExam />} />
        </Route>
        <Route path='/teacher' element={<TeacherDashboard />} />
        <Route path='/student' element={<StudentDashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
