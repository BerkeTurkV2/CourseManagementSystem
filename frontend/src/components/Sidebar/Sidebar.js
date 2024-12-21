import React from 'react';
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaUserPlus } from 'react-icons/fa';
import { PiNoteFill, PiNotePencilBold } from "react-icons/pi";
import { BsCalendarWeek } from 'react-icons/bs';
import { Link } from "react-router-dom";
import './Sidebar.css';

const Sidebar = ({ userType }) => {
    const sidebarConfig = {
        admin: {
            title: 'Admin Paneli',
            menuItems: [
                { name: 'Dashboard', path: '/admin/mainPanel', icon: FaHome },
                { name: 'Takvim', path: '/admin/calendar', icon: BsCalendarWeek },
                { name: 'Öğrenciler', path: '/admin/studentsList', icon: FaUserGraduate },
                { name: 'Öğretmenler', path: '/admin/teachersList', icon: FaChalkboardTeacher },
                { name: 'Sınavlar', path: '/admin/examsList', icon: PiNoteFill },
                { name: 'Yeni kullanıcı', path: '/admin/newUser', icon: FaUserPlus },
                { name: 'Yeni sonuçlar', path: '/admin/newExam', icon: PiNotePencilBold },
            ]
        },
        student: {
            title: 'Öğrenci Paneli',
            menuItems: [
                { name: 'Dashboard', path: '/student/mainPanel', icon: FaHome },
                { name: 'Takvim', path: '/student/calendar', icon: BsCalendarWeek },
                { name: 'Sonuçlarım', path: '/student/examResults', icon: PiNoteFill },
                { name: 'Randevularım', path: '/student/appointments', icon: BsCalendarWeek },
                { name: 'Ödevlerim', path: '/student/homeworks', icon: PiNotePencilBold },
                { name: 'Devamsızlığım', path: '/student/attendance', icon: FaUserGraduate },
                { name: 'Profil', path: '/student/profile', icon: FaUserGraduate }
            ]
        },
        teacher: {
            title: 'Öğretmen Paneli',
            menuItems: [
                { name: 'Dashboard', path: '/teacher/mainPanel', icon: FaHome },
                { name: 'Takvim', path: '/teacher/calendar', icon: BsCalendarWeek },
                { name: 'Öğrencilerim', path: '/teacher/students', icon: FaUserGraduate },
                { name: 'Sınavlar', path: '/teacher/exams', icon: PiNoteFill },
                { name: 'Ödevler', path: '/teacher/homeworks', icon: PiNotePencilBold },
                { name: 'Randevular', path: '/teacher/appointments', icon: BsCalendarWeek },
                { name: 'Profil', path: '/teacher/profile', icon: FaChalkboardTeacher }
            ]
        }
    };

    const config = sidebarConfig[userType] || sidebarConfig.student;

    return (
        <div className="d-flex flex-column bg-dark text-white vh-100 p-4" style={{ width: '300px' }}>
            <div className="text-center mb-4 mt-3">
                <p>EGE-X Kurs Merkezi</p>
                <img src="/images/logo2.png" alt="Logo" className="rounded-circle logo" />
                <h5 className="text-center mb-2">{config.title}</h5>
            </div>
            <ul className="nav flex-column">
                {config.menuItems.map((item, index) => (
                    <li className="nav-item mb-2" key={index}>
                        <Link to={item.path} className="nav-link text-white d-flex align-items-center">
                            <item.icon className="me-3 fs-3" /> {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
