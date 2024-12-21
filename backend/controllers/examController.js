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

// Öğrencinin tüm sınav sonuçlarını getir
const getStudentExamResults = async (req, res) => {
    try {
        const { studentId } = req.params;
        console.log('Gelen öğrenci numarası:', studentId);

        const examResults = await db.executeQuery(
            `SELECT e.*,
                    COUNT(*) OVER (PARTITION BY e.examDate, e.examType) as total_students,
                    RANK() OVER (PARTITION BY e.examDate, e.examType ORDER BY e.puan DESC) as student_rank
             FROM exams e
             WHERE e.studentNo = ?
             ORDER BY e.examDate DESC`,
            [studentId]
        );

        console.log('Bulunan sınav sonuçları:', examResults);

        // Sonuç boş ise boş array dön
        if (!examResults || examResults.length === 0) {
            console.log('Sınav sonucu bulunamadı');
            return res.json([]);
        }

        // Sonuçları formatla
        const formattedResults = examResults.map(exam => ({
            id: exam.id,
            studentNo: exam.studentNo,
            examType: exam.examType,
            examDate: exam.examDate,
            turkceNet: exam.turkceNet,
            sosyalNet: exam.sosyalNet,
            matematikNet: exam.matematikNet,
            fenNet: exam.fenNet,
            fizikNet: exam.fizikNet,
            kimyaNet: exam.kimyaNet,
            biyolojiNet: exam.biyolojiNet,
            edebiyatNet: exam.edebiyatNet,
            tarihNet: exam.tarihNet,
            cografyaNet: exam.cografyaNet,
            felsefeNet: exam.felsefeNet,
            dinNet: exam.dinNet,
            ingilizceNet: exam.ingilizceNet,
            almancaNet: exam.almancaNet,
            puan: parseFloat(exam.puan).toFixed(2),
            total_students: exam.total_students,
            rank: exam.student_rank,
            created_at: exam.created_at
        }));

        res.json(formattedResults);
    } catch (error) {
        console.error('Sınav sonuçları getirilirken hata:', error);
        res.status(500).json({ error: 'Sınav sonuçları getirilemedi' });
    }
};

// Öğrencinin sınav ortalamalarını getir
const getStudentExamAverages = async (req, res) => {
    try {
        const { studentId } = req.params;
        console.log('Gelen öğrenci numarası (ortalamalar):', studentId);

        // TYT ve AYT ortalamalarını ve sınav sayılarını hesapla
        const averages = await db.executeQuery(
            `SELECT 
                AVG(CASE WHEN examType = 'TYT' THEN puan END) as tyt_average,
                AVG(CASE WHEN examType = 'AYT(MF)' THEN puan END) as ayt_average,
                COUNT(*) as total_exams,
                COUNT(CASE WHEN examType = 'TYT' THEN 1 END) as tyt_count,
                COUNT(CASE WHEN examType = 'AYT(MF)' THEN 1 END) as ayt_count
               FROM exams
               WHERE studentNo = ?`,
            [studentId]
        );

        console.log('Bulunan ortalamalar:', averages);

        // Sonuç boş ise varsayılan değerler dön
        if (!averages || averages.length === 0) {
            console.log('Ortalama bulunamadı');
            return res.json({
                tytAverage: 0,
                aytAverage: 0,
                totalExams: 0,
                tytCount: 0,
                aytCount: 0
            });
        }

        const result = averages[0];
        res.json({
            tytAverage: result.tyt_average || 0,
            aytAverage: result.ayt_average || 0,
            totalExams: result.total_exams || 0,
            tytCount: result.tyt_count || 0,
            aytCount: result.ayt_count || 0
        });
    } catch (error) {
        console.error('Sınav ortalamaları hesaplanırken hata:', error);
        res.status(500).json({ error: 'Sınav ortalamaları hesaplanamadı' });
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
    deleteExams,
    getStudentExamResults,
    getStudentExamAverages
};
