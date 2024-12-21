import React, { useState } from 'react';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="position-relative d-inline-block mb-3">
                                <img 
                                    src="/images/default-avatar.png" 
                                    alt="Profil Resmi" 
                                    className="rounded-circle" 
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                                />
                                {isEditing && (
                                    <button className="btn btn-sm btn-primary position-absolute bottom-0 end-0">
                                        <i className="fas fa-camera"></i>
                                    </button>
                                )}
                            </div>
                            <h4>Öğrenci Adı Soyadı</h4>
                            <p className="text-muted">Öğrenci Numarası: 12345</p>
                            <div className="d-flex justify-content-center gap-2">
                                <button className="btn btn-sm btn-outline-primary">
                                    <i className="fab fa-twitter"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-primary">
                                    <i className="fab fa-linkedin"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-primary">
                                    <i className="fab fa-github"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="card-title mb-0">Kişisel Bilgiler</h5>
                                <button 
                                    className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    {isEditing ? 'Kaydet' : 'Düzenle'}
                                </button>
                            </div>
                            <form>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Ad Soyad</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value="Ahmet Yılmaz" 
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Öğrenci Numarası</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value="12345" 
                                            readOnly 
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">E-posta</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            value="ogrenci@email.com" 
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Telefon</label>
                                        <input 
                                            type="tel" 
                                            className="form-control" 
                                            value="+90 555 123 4567" 
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Adres</label>
                                    <textarea 
                                        className="form-control" 
                                        rows="3" 
                                        readOnly={!isEditing}
                                    >
                                        Örnek Mahallesi, Örnek Sokak No:1 Bornova/İzmir
                                    </textarea>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Doğum Tarihi</label>
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            value="2000-01-01" 
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Sınıf</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value="12-A" 
                                            readOnly 
                                        />
                                    </div>
                                </div>
                                {isEditing && (
                                    <div className="mb-3">
                                        <label className="form-label">Şifre Değiştir</label>
                                        <input 
                                            type="password" 
                                            className="form-control mb-2" 
                                            placeholder="Yeni Şifre" 
                                        />
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Şifre Tekrar" 
                                        />
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;