require('dotenv').config();
const db = require('../config/db');

// Yeni sınav sonucu ekleme
const addExam = async (req, res) => {
    const {
        studentNo,
        examType,
        examDate,
        turkceNet,
        sosyalNet,
        matematikNet,
        fenNet,
        fizikNet,
        kimyaNet,
        biyolojiNet,
        edebiyatNet,
        tarihNet,
        cografyaNet,
        felsefeNet,
        dinNet,
        ingilizceNet,
        almancaNet,
        puan
    } = req.body;

    const query = `
        INSERT INTO exams (
            studentNo, examType, examDate, turkceNet, sosyalNet, 
            matematikNet, fenNet, fizikNet, kimyaNet, biyolojiNet,
            edebiyatNet, tarihNet, cografyaNet, felsefeNet, dinNet,
            ingilizceNet, almancaNet, puan
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        studentNo,
        examType,
        examDate,
        turkceNet || 0,
        sosyalNet || 0,
        matematikNet || 0,
        fenNet || 0,
        fizikNet || 0,
        kimyaNet || 0,
        biyolojiNet || 0,
        edebiyatNet || 0,
        tarihNet || 0,
        cografyaNet || 0,
        felsefeNet || 0,
        dinNet || 0,
        ingilizceNet || 0,
        almancaNet || 0,
        puan || 0
    ];

    try {
        await db.executeQuery(query, values);
        res.status(201).json({ message: 'Sınav sonucu başarıyla eklendi!' });
    } catch (err) {
        console.error('Sınav sonucu eklenirken hata oluştu:', err);
        res.status(500).json({ message: 'Sınav sonucu eklenirken bir hata oluştu.' });
    }
};

// Öğrenci numarasına göre öğrenci bilgilerini getirme
const getStudentInfo = async (req, res) => {
    const { studentNo } = req.params;

    const query = 'SELECT fullname, exam, class FROM users WHERE studentNo = ? AND role = "student"';
    
    try {
        const result = await db.executeQuery(query, [studentNo]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Öğrenci bulunamadı.' });
        }

        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Öğrenci bilgileri getirilirken hata oluştu:', err);
        res.status(500).json({ message: 'Öğrenci bilgileri getirilirken bir hata oluştu.' });
    }
};

// Tüm öğrenci numaralarını getirme
const getAllStudentNumbers = async (req, res) => {
    const query = 'SELECT studentNo, fullname FROM users WHERE role = "student" ORDER BY studentNo';
    
    try {
        const result = await db.executeQuery(query);
        res.status(200).json(result);
    } catch (err) {
        console.error('Öğrenci numaraları getirilirken hata oluştu:', err);
        res.status(500).json({ message: 'Öğrenci numaraları getirilirken bir hata oluştu.' });
    }
};

// Get exams by date
const getExamsByDate = async (req, res) => {
    try {
        const { date } = req.params;
        console.log('Requested date:', date);

        // Tarihi Türkiye saat dilimine göre ayarla (UTC+3)
        const queryDate = new Date(date);
        queryDate.setHours(3, 0, 0, 0); // UTC+3 için saat 3'e ayarla
        console.log('Query date:', queryDate.toISOString());

        const query = `
            SELECT e.*, u.fullname, u.studentNo, u.class
            FROM exams e
            JOIN users u ON e.studentNo = u.studentNo
            WHERE DATE(e.examDate) = DATE(?)
            ORDER BY u.studentNo`;
        
        const results = await db.executeQuery(query, [queryDate]);
        console.log('Query results:', results);
        res.json(results);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Error fetching exams' });
    }
};

// Get all unique exam dates
const getExamDates = async (req, res) => {
    try {
        const query = `
            SELECT DISTINCT 
                examDate,
                DATE_FORMAT(examDate, '%Y-%m-%d') as formattedDate
            FROM exams 
            ORDER BY examDate DESC`;
        
        const results = await db.executeQuery(query);

        // Tarihleri UTC+3'e göre ayarla
        const adjustedResults = results.map(result => ({
            ...result,
            examDate: new Date(new Date(result.examDate).getTime() + (3 * 60 * 60 * 1000)).toISOString()
        }));
        
        if (!adjustedResults || adjustedResults.length === 0) {
            return res.json([]);
        }

        res.json(adjustedResults);
    } catch (error) {
        console.error('Sınav tarihleri getirilirken hata oluştu:', error);
        res.status(500).json({ message: 'Sınav tarihleri getirilirken bir hata oluştu' });
    }
};

// Get exam types by date
const getExamTypesByDate = async (req, res) => {
    try {
        const { date } = req.params;

        const query = `
            SELECT DISTINCT examType
            FROM exams
            WHERE DATE(examDate) = DATE(?)
            ORDER BY examType`;
        
        const results = await db.executeQuery(query, [date]);
        res.json(results);
    } catch (error) {
        console.error('Sınav türleri getirilirken hata oluştu:', error);
        res.status(500).json({ message: 'Sınav türleri getirilirken bir hata oluştu' });
    }
};

// Get exams by date and type
const getExamsByDateAndType = async (req, res) => {
    try {
        const { date, examType } = req.params;
        const queryDate = new Date(date);
        queryDate.setHours(3, 0, 0, 0);

        const query = `
            SELECT 
                e.*,
                u.fullname,
                u.studentNo,
                u.class,
                RANK() OVER (ORDER BY e.puan DESC) as ranking
            FROM exams e
            JOIN users u ON e.studentNo = u.studentNo
            WHERE DATE(e.examDate) = DATE(?)
            AND e.examType = ?
            ORDER BY e.puan DESC`;
        
        const results = await db.executeQuery(query, [queryDate, examType]);
        res.json(results);
    } catch (error) {
        console.error('Sınav sonuçları getirilirken hata oluştu:', error);
        res.status(500).json({ message: 'Sınav sonuçları getirilirken bir hata oluştu' });
    }
};

// Belirli bir tarihteki son sınavın öğrenci puanlarını getirme
const getLatestExamScores = async (req, res) => {
    const { date } = req.params;

    const query = `
        SELECT studentNo, puan 
        FROM exams 
        WHERE examDate = ? 
        ORDER BY puan DESC
    `;

    try {
        const results = await db.executeQuery(query, [date]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Belirtilen tarihte sınav bulunamadı.' });
        }

        res.status(200).json(results);
    } catch (err) {
        console.error('Sınav puanları getirilirken hata oluştu:', err);
        res.status(500).json({ message: 'Sınav puanları getirilirken bir hata oluştu.' });
    }
};

// Son sınavın detaylarını getirme
const getLatestExamDetails = async (req, res) => {
    const { date } = req.params;

    const query = `
        SELECT 
            examType, 
            COUNT(DISTINCT studentNo) as totalStudents
        FROM exams 
        WHERE examDate = ?
        GROUP BY examType
    `;

    try {
        const results = await db.executeQuery(query, [date]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Belirtilen tarihte sınav bulunamadı.' });
        }

        res.status(200).json(results[0]); // İlk sonucu döndür (tek bir sınav türü varsayımıyla)
    } catch (err) {
        console.error('Sınav detayları getirilirken hata oluştu:', err);
        res.status(500).json({ message: 'Sınav detayları getirilirken bir hata oluştu.' });
    }
};

// Sınav sonuçlarını silme
const deleteExams = async (req, res) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'Geçersiz id listesi' });
    }

    try {
        const placeholders = ids.map(() => '?').join(',');
        const query = `DELETE FROM exams WHERE id IN (${placeholders})`;
        const result = await db.executeQuery(query, ids);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Silinecek sınav sonucu bulunamadı.' });
        }

        res.status(200).json({ 
            message: 'Sınav sonuçları başarıyla silindi',
            deletedCount: result.affectedRows 
        });
    } catch (err) {
        console.error('Sınav sonuçlarını silerken hata oluştu:', err);
        res.status(500).json({ message: 'Silme işlemi sırasında bir hata oluştu.' });
    }
};

module.exports = {
    addExam,
    getStudentInfo,
    getAllStudentNumbers,
    getExamsByDate,
    getExamDates,
    getExamTypesByDate,
    getExamsByDateAndType,
    getLatestExamScores,
    getLatestExamDetails,
    deleteExams
};
