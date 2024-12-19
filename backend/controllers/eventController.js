const db = require('../config/db');

// Tarihi MySQL datetime formatına dönüştüren yardımcı fonksiyon
const formatDateForMySQL = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

// Tüm etkinlikleri getir
const getEvents = async (req, res) => {
    try {
        const query = 'SELECT * FROM events';
        const events = await db.executeQuery(query);
        
        // Tarihleri ISO formatına dönüştür
        const formattedEvents = events.map(event => ({
            ...event,
            start: new Date(event.start_date).toISOString(),
            end: new Date(event.end_date).toISOString()
        }));
        
        res.json(formattedEvents);
    } catch (error) {
        console.error('Etkinlikler getirilirken hata:', error);
        res.status(500).json({ message: 'Etkinlikler getirilirken bir hata oluştu' });
    }
};

// Yeni etkinlik ekle
const addEvent = async (req, res) => {
    try {
        const { title, type, description, start, end } = req.body;
        const created_by = req.user.id; // JWT'den gelen kullanıcı ID'si

        // Tarihleri MySQL formatına dönüştür
        const formattedStartDate = formatDateForMySQL(start);
        const formattedEndDate = formatDateForMySQL(end);

        const query = `
            INSERT INTO events (title, type, description, start_date, end_date, created_by)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        const result = await db.executeQuery(query, [
            title,
            type,
            description,
            formattedStartDate,
            formattedEndDate,
            created_by
        ]);

        res.status(201).json({
            id: result.insertId,
            title,
            type,
            description,
            start,
            end,
            created_by
        });
    } catch (error) {
        console.error('Etkinlik eklenirken hata:', error);
        res.status(500).json({ message: 'Etkinlik eklenirken bir hata oluştu' });
    }
};

// Etkinlik güncelle
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, type, description, start, end } = req.body;

        // Tarihleri MySQL formatına dönüştür
        const formattedStartDate = formatDateForMySQL(start);
        const formattedEndDate = formatDateForMySQL(end);

        const query = `
            UPDATE events 
            SET title = ?, type = ?, description = ?, start_date = ?, end_date = ?
            WHERE id = ?
        `;
        
        await db.executeQuery(query, [
            title,
            type,
            description,
            formattedStartDate,
            formattedEndDate,
            id
        ]);

        res.json({ message: 'Etkinlik başarıyla güncellendi' });
    } catch (error) {
        console.error('Etkinlik güncellenirken hata:', error);
        res.status(500).json({ message: 'Etkinlik güncellenirken bir hata oluştu' });
    }
};

// Etkinlik sil
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM events WHERE id = ?';
        await db.executeQuery(query, [id]);
        res.json({ message: 'Etkinlik başarıyla silindi' });
    } catch (error) {
        console.error('Etkinlik silinirken hata:', error);
        res.status(500).json({ message: 'Etkinlik silinirken bir hata oluştu' });
    }
};

module.exports = {
    getEvents,
    addEvent,
    updateEvent,
    deleteEvent
};
