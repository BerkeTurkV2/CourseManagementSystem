import React from 'react';

const Attendance = () => {
    return (
        <div className="container mt-4">
            <h2>Devamsızlık Durumu</h2>
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Toplam Devamsızlık</h5>
                            <p className="card-text display-4">4</p>
                            <p className="text-muted">Gün</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Rapor/İzin</h5>
                            <p className="card-text display-4">1</p>
                            <p className="text-muted">Gün</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Özürsüz</h5>
                            <p className="card-text display-4">3</p>
                            <p className="text-muted">Gün</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Kalan Hak</h5>
                            <p className="card-text display-4">6</p>
                            <p className="text-muted">Gün</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Tarih</th>
                            <th>Gün</th>
                            <th>Durum</th>
                            <th>Açıklama</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2024-01-15</td>
                            <td>Pazartesi</td>
                            <td><span className="badge bg-warning">Raporlu</span></td>
                            <td>Sağlık raporu</td>
                            <td>
                                <button className="btn btn-sm btn-info">Detaylar</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2024-01-10</td>
                            <td>Çarşamba</td>
                            <td><span className="badge bg-danger">Özürsüz</span></td>
                            <td>-</td>
                            <td>
                                <button className="btn btn-sm btn-info">Detaylar</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2024-01-05</td>
                            <td>Cuma</td>
                            <td><span className="badge bg-success">İzinli</span></td>
                            <td>Aile ziyareti</td>
                            <td>
                                <button className="btn btn-sm btn-info">Detaylar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;