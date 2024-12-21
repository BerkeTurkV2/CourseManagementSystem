import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor ekle
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = (data) => api.post('/api/login', data);
export const addUser = (data) => api.post('/api/add-user', data);
export const checkStudentNoUnique = (studentNo) => {
  return api.post('/api/check-student-no', { studentNo })
    .then((response) => response.data.isUnique)
    .catch((error) => {
      console.error('Benzersizlik kontrolü sırasında hata oluştu:', error);
      return false;
    });
};

// User endpoints
export const getStudents = () => api.get('/api/students');
export const getTeachers = () => api.get('/api/teachers');
export const deleteStudents = (ids) => api.post('/api/deleteStudents', { ids });
export const deleteTeachers = (ids) => api.post('/api/deleteTeachers', { ids });

// Exam endpoints
export const addExam = (data) => api.post('/api/add-exam', data);
export const getStudentInfo = (studentNo) => api.get(`/api/student-info/${studentNo}`);
export const getAllStudentNumbers = () => api.get('/api/student-numbers');
export const getStudentList = () => api.get('/api/student-list');
export const deleteExams = async (ids) => {
  return await api.post('/api/delete', { ids });
};
export const getExamDates = () => api.get('/api/dates');
export const getExamTypesByDate = (date) => api.get(`/api/exam-types/${date}`);
export const getExamsByDateAndType = (date, examType) => api.get(`/api/by-date/${date}/${examType}`);
export const getLatestExamScores = (date) => api.get(`/api/latest-exam-scores/${date}`);
export const getLatestExamDetails = (date) => api.get(`/api/latest-exam-details/${date}`);

// Öğrenci sınav sonuçları endpoints
export const getStudentExamResults = async (studentId) => {
  return api.get(`/api/exams/student/${studentId}`);
};

export const getStudentExamAverages = async (studentId) => {
  return api.get(`/api/exams/student/${studentId}/averages`);
};

// Calendar events endpoints
export const getEvents = () => api.get('/api/events');
export const addEvent = (data) => api.post('/api/events', data);
export const updateEvent = (id, data) => api.put(`/api/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/api/events/${id}`);
