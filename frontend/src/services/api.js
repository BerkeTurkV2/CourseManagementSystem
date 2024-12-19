import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const addUser = (data) => axios.post(`${API_URL}/api/add-user`, data);
export const checkStudentNoUnique = (studentNo) => {
    return axios.post(`${API_URL}/api/check-student-no`, { studentNo })
      .then((response) => response.data.isUnique)  // Burada, backend'den gelen 'isUnique' değerini döndürüyoruz
      .catch((error) => {
        console.error('Benzersizlik kontrolü sırasında hata oluştu:', error);
        return false; // Hata durumunda benzersiz olmadığını varsay
      });
  };

export const getStudents = () => axios.get(`${API_URL}/api/students`);
export const getTeachers = () => axios.get(`${API_URL}/api/teachers`);

export const deleteStudents = (ids) => {
  return axios.post(`${API_URL}/api/deleteStudents`, { ids });
};

export const deleteTeachers = (ids) => {
  return axios.post(`${API_URL}/api/deleteTeachers`, { ids });
};

// Sınav sonucu ekleme
export const addExam = (data) => axios.post(`${API_URL}/api/add-exam`, data);

// Öğrenci numarasına göre öğrenci bilgilerini getirme
export const getStudentInfo = (studentNo) => axios.get(`${API_URL}/api/student-info/${studentNo}`);

// Tüm öğrenci numaralarını getirme
export const getAllStudentNumbers = () => axios.get(`${API_URL}/api/student-numbers`);

// Öğrenci listesini getir
export const getStudentList = () => axios.get(`${API_URL}/api/student-list`);

// Sınav sonuçlarını silme
export const deleteExams = async (ids) => {
    return await axios.post(`${API_URL}/api/delete`, { ids });
};

// Sınav tarihleri
export const getExamDates = () => axios.get(`${API_URL}/api/dates`);

// Belirli bir tarihteki sınav türlerini getir
export const getExamTypesByDate = (date) => axios.get(`${API_URL}/api/exam-types/${date}`);

// Belirli bir tarih ve türdeki sınavları getir
export const getExamsByDateAndType = (date, examType) => axios.get(`${API_URL}/api/by-date/${date}/${examType}`);

// Belirli bir tarihteki son sınavın öğrenci puanlarını getir
export const getLatestExamScores = (date) => axios.get(`${API_URL}/api/latest-exam-scores/${date}`);

// Son sınavın detaylarını getir
export const getLatestExamDetails = (date) => axios.get(`${API_URL}/api/latest-exam-details/${date}`);
