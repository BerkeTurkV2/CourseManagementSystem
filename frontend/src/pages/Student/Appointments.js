import React from 'react';

const Appointments = () => {
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Randevularım</h2>
                <button className="btn btn-primary">
                    <i className="fas fa-plus me-2"></i>
                    Yeni Randevu
                </button>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Bekleyen Randevular</h5>
                            <p className="card-text display-4">3</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Onaylanan Randevular</h5>
                            <p className="card-text display-4">5</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">İptal Edilen</h5>
                            <p className="card-text display-4">1</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Öğretmen</th>
                            <th>Ders</th>
                            <th>Tarih</th>
                            <th>Saat</th>
                            <th>Durum</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ahmet Yılmaz</td>
                            <td>Matematik</td>
                            <td>2024-01-20</td>
                            <td>14:30</td>
                            <td><span className="badge bg-warning">Beklemede</span></td>
                            <td>
                                <button className="btn btn-sm btn-danger me-2">İptal Et</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Ayşe Demir</td>
                            <td>Fizik</td>
                            <td>2024-01-22</td>
                            <td>15:00</td>
                            <td><span className="badge bg-success">Onaylandı</span></td>
                            <td>
                                <button className="btn btn-sm btn-danger me-2">İptal Et</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Mehmet Kaya</td>
                            <td>Kimya</td>
                            <td>2024-01-19</td>
                            <td>16:30</td>
                            <td><span className="badge bg-danger">İptal Edildi</span></td>
                            <td>
                                <button className="btn btn-sm btn-primary">Yeniden Planla</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Appointments;