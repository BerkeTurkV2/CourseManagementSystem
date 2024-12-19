const jwt = require('jsonwebtoken');

function authorize(roles = []) {
  // roles parametresini dizi haline getir
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Yetkisiz erişim: Token bulunamadı' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Kullanıcı rolünü kontrol et
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ 
          message: 'Yetkisiz erişim: Bu işlem için yetkiniz yok',
          requiredRoles: roles,
          userRole: decoded.role
        });
      }

      // Kullanıcı bilgilerini request nesnesine ekle
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Token doğrulama hatası:', error);
      return res.status(403).json({ 
        message: 'Geçersiz veya süresi dolmuş token',
        error: error.message 
      });
    }
  };
}

module.exports = authorize;
