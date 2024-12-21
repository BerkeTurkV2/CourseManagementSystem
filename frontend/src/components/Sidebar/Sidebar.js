import React from 'react';
import { FaHome, FaUserGraduate, FaUser, FaCalendarAlt , FaRunning, FaChalkboardTeacher, FaUserPlus } from 'react-icons/fa';
import { PiNoteFill, PiNotePencilBold } from "react-icons/pi";
import { BsCalendarWeek } from 'react-icons/bs';
import { Link } from "react-router-dom";
import './Sidebar.css';

const Sidebar = ({ userType }) => {
    const sidebarConfig = {
        admin: {
            title: 'Admin Paneli',
            menuItems: [
                { name: 'Dashboard', path: '/admin/mainPanel',style: 'nav-item mb-4' ,icon: FaHome },
                { name: 'Takvim', path: '/admin/calendar',style: 'nav-item mb-2', icon: BsCalendarWeek },
                { name: 'Öğrenciler', path: '/admin/studentsList',style: 'nav-item mb-2', icon: FaUserGraduate },
                { name: 'Öğretmenler', path: '/admin/teachersList',style: 'nav-item mb-2', icon: FaChalkboardTeacher },
                { name: 'Sınavlar', path: '/admin/examsList',style: 'nav-item mb-4', icon: PiNoteFill },
                { name: 'Yeni kullanıcı', path: '/admin/newUser',style: 'nav-item mb-2', icon: FaUserPlus },
                { name: 'Yeni sonuçlar', path: '/admin/newExam',style: 'nav-item mb-2', icon: PiNotePencilBold },
            ]
        },
        student: {
            title: 'Öğrenci Paneli',
            menuItems: [
                { name: 'Dashboard', path: '/student/mainPanel', style: 'nav-item mb-4', icon: FaHome },
                { name: 'Takvim', path: '/student/calendar', style: 'nav-item mb-2', icon: BsCalendarWeek },
                { name: 'Sonuçlarım', path: '/student/examResults', style: 'nav-item mb-2', icon: PiNoteFill },
                { name: 'Ödevlerim', path: '/student/homeworks', style: 'nav-item mb-2', icon: PiNotePencilBold },
                { name: 'Randevularım', path: '/student/appointments', style: 'nav-item mb-2', icon: FaCalendarAlt },
                { name: 'Devamsızlığım', path: '/student/attendance', style: 'nav-item mb-4', icon: FaRunning },
                { name: 'Profil', path: '/student/profile', style: 'nav-item mb-2', icon: FaUser }
            ]
        },
        teacher: {
            title: 'Öğretmen Paneli',
            menuItems: [
                { name: 'Dashboard', path: '/teacher/mainPanel',style: 'nav-item mb-2', icon: FaHome },
                { name: 'Takvim', path: '/teacher/calendar',style: 'nav-item mb-2', icon: BsCalendarWeek },
                { name: 'Öğrencilerim', path: '/teacher/students',style: 'nav-item mb-2', icon: FaUserGraduate },
                { name: 'Sınavlar', path: '/teacher/exams',style: 'nav-item mb-2', icon: PiNoteFill },
                { name: 'Ödevler', path: '/teacher/homeworks',style: 'nav-item mb-2', icon: PiNotePencilBold },
                { name: 'Randevular', path: '/teacher/appointments',style: 'nav-item mb-2', icon: BsCalendarWeek },
                { name: 'Profil', path: '/teacher/profile',style: 'nav-item mb-2', icon: FaChalkboardTeacher }
            ]
        }
    };

    const config = sidebarConfig[userType] || sidebarConfig.student;

    return (
        <div className="d-flex flex-column bg-dark text-white vh-100 p-4" style={{ width: '300px' }}>
            <div className="text-center mb-4 mt-3">
                <p>EGE-X Kurs Merkezi</p>
                <img src="/images/logo2.png" alt="Logo" className="rounded-circle logo" />
                <h5 className="text-center mb-4">{config.title}</h5>
            </div>
            <ul className="nav flex-column">
                {config.menuItems.map((item, index) => (
                    <li className={item.style} key={index}>
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
