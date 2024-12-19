const express = require('express');
const { getEvents, addEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const authorize = require('../middlewares/authorize');

const router = express.Router();

// Tüm etkinlikleri getir (herkes görebilir)
router.get('/events', getEvents);

// Yeni etkinlik ekle (sadece admin)
router.post('/events', authorize(['admin']), addEvent);

// Etkinlik güncelle (sadece admin)
router.put('/events/:id', authorize(['admin']), updateEvent);

// Etkinlik sil (sadece admin)
router.delete('/events/:id', authorize(['admin']), deleteEvent);

module.exports = router;
