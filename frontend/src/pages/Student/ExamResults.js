import React from 'react';

const ExamResults = () => {
    return (
        <div className="container mt-4">
            <h2>Sınav Sonuçlarım</h2>
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Genel Ortalama</h5>
                            <p className="card-text display-4">85.5</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Toplam Sınav</h5>
                            <p className="card-text display-4">12</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Başarı Yüzdesi</h5>
                            <p className="card-text display-4">%90</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sınav Adı</th>
                            <th>Ders</th>
                            <th>Tarih</th>
                            <th>Puan</th>
                            <th>Durum</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ara Sınav</td>
                            <td>Matematik</td>
                            <td>2024-01-15</td>
                            <td>85</td>
                            <td><span className="badge bg-success">Başarılı</span></td>
                        </tr>
                        <tr>
                            <td>Quiz 1</td>
                            <td>Fizik</td>
                            <td>2024-01-10</td>
                            <td>75</td>
                            <td><span className="badge bg-warning">Orta</span></td>
                        </tr>
                        <tr>
                            <td>Final</td>
                            <td>Kimya</td>
                            <td>2024-01-20</td>
                            <td>95</td>
                            <td><span className="badge bg-success">Başarılı</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExamResults;