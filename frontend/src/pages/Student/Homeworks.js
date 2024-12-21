import React from 'react';

const Homeworks = () => {
    return (
        <div className="container mt-4">
            <h2>Ödevlerim</h2>
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Bekleyen Ödevler</h5>
                            <p className="card-text display-4">4</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Tamamlanan</h5>
                            <p className="card-text display-4">8</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Geciken</h5>
                            <p className="card-text display-4">1</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Ders</th>
                            <th>Ödev Konusu</th>
                            <th>Veriliş Tarihi</th>
                            <th>Son Teslim</th>
                            <th>Durum</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Matematik</td>
                            <td>İntegral Problemleri</td>
                            <td>2024-01-15</td>
                            <td>2024-01-22</td>
                            <td><span className="badge bg-warning">Beklemede</span></td>
                            <td>
                                <button className="btn btn-sm btn-primary me-2">Yükle</button>
                                <button className="btn btn-sm btn-info">Detaylar</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Fizik</td>
                            <td>Newton Kanunları</td>
                            <td>2024-01-10</td>
                            <td>2024-01-17</td>
                            <td><span className="badge bg-success">Tamamlandı</span></td>
                            <td>
                                <button className="btn btn-sm btn-info">Detaylar</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Kimya</td>
                            <td>Asit-Baz Deneyi</td>
                            <td>2024-01-05</td>
                            <td>2024-01-12</td>
                            <td><span className="badge bg-danger">Gecikmiş</span></td>
                            <td>
                                <button className="btn btn-sm btn-primary me-2">Yükle</button>
                                <button className="btn btn-sm btn-info">Detaylar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Homeworks;