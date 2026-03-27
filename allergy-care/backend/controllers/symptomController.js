const pool = require('../config/db');

const analyzeSymptoms = (description) => {
    const desc = description.toLowerCase();
    const findings = [];
    
    if (desc.includes('sneezing') || desc.includes('runny nose') || desc.includes('itchy eyes') || desc.includes('pollen')) {
        findings.push({
            name: 'Environmental Pollen',
            type: 'pollen',
            rec: 'Limit outdoor exposure between 5am-10am.'
        });
    }
    
    if (desc.includes('rash') || desc.includes('hives') || desc.includes('itchy skin')) {
        findings.push({
            name: 'Contact Sensitivity',
            type: 'sensitivity',
            rec: 'Wash affected area with cool water. Avoid new soaps/detergents.'
        });
    }
    
    if (desc.includes('cough') || desc.includes('wheezing') || desc.includes('breath')) {
        findings.push({
            name: 'Respiratory Irritant',
            type: 'respiratory',
            rec: 'Check humidity levels. Use a mask in dusty environments.'
        });
    }
    
    if (desc.includes('cat') || desc.includes('dog') || desc.includes('animal') || desc.includes('dander')) {
        findings.push({
            name: 'Animal Dander',
            type: 'animal',
            rec: 'Keep pets out of bedrooms. Use a HEPA air filter.'
        });
    }

    if (findings.length === 0) {
        return {
            potential_allergens: 'General Irritants',
            trigger_type: 'unknown',
            recommendations: 'Track your environment and consult an allergist for persistent symptoms.'
        };
    }

    return {
        potential_allergens: findings.map(f => f.name).join(' & '),
        trigger_type: findings[0].type, // Primary trigger
        recommendations: findings.map(f => f.rec).join(' ')
    };
};

exports.logSymptom = async (req, res) => {
    const { description, severity } = req.body;
    const userId = req.userId;
    
    if (!description) return res.status(400).json({ message: 'Description is required' });

    try {
        const [result] = await pool.query(
            'INSERT INTO symptoms (user_id, description, severity) VALUES (?, ?, ?)',
            [userId, description, severity || 'moderate']
        );
        
        const analysis = analyzeSymptoms(description);
        
        await pool.query(
            'INSERT INTO analysis_results (user_id, symptom_id, potential_allergens, trigger_type, recommendations) VALUES (?, ?, ?, ?, ?)',
            [userId, result.insertId, analysis.potential_allergens, analysis.trigger_type, analysis.recommendations]
        );

        res.status(201).json({ 
            message: 'Symptom logged and analyzed', 
            symptomId: result.insertId,
            analysis 
        });
    } catch (error) {
        console.error('Symptom Logging Error:', error);
        res.status(500).json({ message: 'Error logging symptom', error: error.message });
    }
};

exports.getHistory = async (req, res) => {
    const userId = req.userId;
    try {
        const [history] = await pool.query(
            `SELECT s.*, a.potential_allergens, a.trigger_type, a.recommendations 
             FROM symptoms s 
             LEFT JOIN analysis_results a ON s.id = a.symptom_id 
             WHERE s.user_id = ? 
             ORDER BY s.logged_at DESC`,
            [userId]
        );
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history', error: error.message });
    }
};

exports.getFaqs = async (req, res) => {
    try {
        const [faqs] = await pool.query('SELECT * FROM faqs');
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching FAQs', error: error.message });
    }
};

exports.deleteSymptom = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        const [result] = await pool.query('DELETE FROM symptoms WHERE id = ? AND user_id = ?', [id, userId]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Symptom not found or unauthorized' });
        res.status(200).json({ message: 'Symptom deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting symptom', error: error.message });
    }
};
