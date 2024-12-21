const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL bağlantı havuzu oluştur
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'coursemanagement',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Genel sorgu çalıştırma fonksiyonu
const executeQuery = async (query, params = []) => {
    let connection;
    try {
        connection = await db.getConnection();
        const [results] = await connection.execute(query, params);
        return results;
    } catch (error) {
        console.error('Veritabanı sorgu hatası:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

// Bağlantıyı test et
async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log('Veritabanı bağlantısı başarılı!');
        connection.release();
    } catch (error) {
        console.error('Veritabanı bağlantı hatası:', error);
        process.exit(1); // Bağlantı başarısız olursa uygulamayı sonlandır
    }
}

// Bağlantıyı test et
testConnection();

module.exports = {
    executeQuery,
    db
};
