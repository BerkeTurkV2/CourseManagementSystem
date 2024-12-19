const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL bağlantı havuzu oluştur
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'coursemanagement',
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
        console.log('MySQL bağlantısı başarılı!');
        connection.release();
    } catch (error) {
        console.error('MySQL bağlantı hatası:', error);
    }
}

// Bağlantıyı test et
testConnection();

module.exports = {
    db,
    executeQuery
};
