import React, { useState, useEffect } from 'react';
import { getStudentExamResults, getStudentExamAverages } from '../../services/api';

const ExamResults = () => {
  const [examResults, setExamResults] = useState([]);
  const [examAverages, setExamAverages] = useState({
    tytAverage: 0,
    aytAverage: 0,
    totalExams: 0,
    tytCount: 0,
    aytCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExamType, setSelectedExamType] = useState(''); // Başlangıçta boş, useEffect'te doldurulacak

  // Sayıyı formatla (null veya undefined kontrolü ile)
  const formatNumber = (number) => {
    if (number === null || number === undefined) return "0.00";
    return parseFloat(number).toFixed(2);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentNo = localStorage.getItem('studentNo');
        if (!studentNo) {
          setError('Öğrenci numarası bulunamadı. Lütfen tekrar giriş yapın.');
          setLoading(false);
          return;
        }

        const [resultsResponse, averagesResponse] = await Promise.all([
          getStudentExamResults(studentNo),
          getStudentExamAverages(studentNo)
        ]);

        if (resultsResponse.data) {
          setExamResults(resultsResponse.data);
          // İlk sınav türünü varsayılan olarak seç
          if (resultsResponse.data.length > 0) {
            setSelectedExamType(resultsResponse.data[0].examType);
          }
        }
        
        if (averagesResponse.data) {
          const averages = averagesResponse.data;
          setExamAverages({
            tytAverage: parseFloat(averages.tytAverage || 0),
            aytAverage: parseFloat(averages.aytAverage || 0),
            totalExams: parseInt(averages.totalExams || 0),
            tytCount: parseInt(averages.tytCount || 0),
            aytCount: parseInt(averages.aytCount || 0)
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Sınav sonuçları yüklenirken hata:', error);
        setError('Sınav sonuçları yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Seçilen sınav türüne göre sonuçları filtrele
  const filteredResults = examResults.filter(exam => exam.examType === selectedExamType);

  // Sınav türüne göre tablo başlıklarını belirle
  const getTableHeaders = () => {
    if (selectedExamType === 'TYT') {
      return (
        <tr>
          <th>Sınav Tarihi</th>
          <th>Türkçe Net</th>
          <th>Sosyal Bilimler Net</th>
          <th>Temel Matematik Net</th>
          <th>Fizik Net</th>
          <th>Kimya Net</th>
          <th>Biyoloji Net</th>
          <th>Puan</th>
          <th>Sıralama</th>
        </tr>
      );
    } else if (selectedExamType === 'AYT(MF)') {
      return (
        <tr>
          <th>Sınav Tarihi</th>
          <th>Matematik Net</th>
          <th>Fizik Net</th>
          <th>Kimya Net</th>
          <th>Biyoloji Net</th>
          <th>Puan</th>
          <th>Sıralama</th>
        </tr>
      );
    }
    return null;
  };

  // Sınav türüne göre tablo satırlarını belirle
  const getTableRow = (exam) => {
    if (exam.examType === 'TYT') {
      return (
        <tr key={exam.id}>
          <td>{new Date(exam.examDate).toLocaleDateString()}</td>
          <td>{exam.turkceNet}</td>
          <td>{exam.sosyalNet}</td>
          <td>{exam.matematikNet}</td>
          <td>{exam.fizikNet}</td>
          <td>{exam.kimyaNet}</td>
          <td>{exam.biyolojiNet}</td>
          <td>{formatNumber(exam.puan)}</td>
          <td>{exam.student_rank} / {exam.total_students}</td>
        </tr>
      );
    } else if (exam.examType === 'AYT(MF)') {
      return (
        <tr key={exam.id}>
          <td>{new Date(exam.examDate).toLocaleDateString()}</td>
          <td>{exam.matematikNet}</td>
          <td>{exam.fizikNet}</td>
          <td>{exam.kimyaNet}</td>
          <td>{exam.biyolojiNet}</td>
          <td>{formatNumber(exam.puan)}</td>
          <td>{exam.student_rank} / {exam.total_students}</td>
        </tr>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid px-4">
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4">
      <h2 className="mt-4">Sınav Sonuçlarım</h2>
      
      {/* İstatistik Kartları */}
      <div className="row mt-4">
        <div className="col-xl-4 col-md-6">
          <div className="card bg-dark text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">TYT Ortalaması</h5>
              <p className="display-6">{formatNumber(examAverages.tytAverage)}</p>
              <p className="text-muted">Toplam {examAverages.tytCount} TYT sınavı</p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6">
          <div className="card bg-dark text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">AYT Ortalaması</h5>
              <p className="display-6">{formatNumber(examAverages.aytAverage)}</p>
              <p className="text-muted">Toplam {examAverages.aytCount} AYT sınavı</p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6">
          <div className="card bg-dark text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">Toplam Sınav</h5>
              <p className="display-6">{examAverages.totalExams}</p>
              <p className="text-muted">Girilen toplam sınav sayısı</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sınav Sonuçları Tablosu */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <i className="fas fa-table me-1"></i>
            Detaylı Sınav Sonuçları
          </div>
          <div className="d-flex align-items-center">
            <label className="me-2">Sınav Türü:</label>
            <select 
              className="form-select form-select-sm" 
              style={{ width: 'auto' }}
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
            >
              <option value="TYT">TYT</option>
              <option value="AYT(MF)">AYT (MF)</option>
            </select>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                {getTableHeaders()}
              </thead>
              <tbody>
                {filteredResults.map(exam => getTableRow(exam))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;