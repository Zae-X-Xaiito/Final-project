const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

exports.register = async (req, res) => {
    const { fullName, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [fullName, email, hashedPassword, role || 'user']
        );
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({
            id: user.id,
            fullName: user.full_name,
            email: user.email,
            role: user.role,
            accessToken: token
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    const { fullName, email } = req.body;
    const userId = req.userId;
    try {
        await pool.query('UPDATE users SET full_name = ?, email = ? WHERE id = ?', [fullName, email, userId]);
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Update failed', error: error.message });
    }
};

exports.getSettings = async (req, res) => {
    const userId = req.userId;
    try {
        const [settings] = await pool.query('SELECT * FROM user_settings WHERE user_id = ?', [userId]);
        if (settings.length === 0) {
            await pool.query('INSERT INTO user_settings (user_id) VALUES (?)', [userId]);
            return res.status(200).json({ pollen_alerts: true, daily_tips: true, theme: 'light' });
        }
        res.status(200).json(settings[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching settings', error: error.message });
    }
};

exports.updateSettings = async (req, res) => {
    const userId = req.userId;
    const { pollen_alerts, daily_tips, theme } = req.body;
    try {
        await pool.query(
            'UPDATE user_settings SET pollen_alerts = ?, daily_tips = ?, theme = ? WHERE user_id = ?',
            [pollen_alerts, daily_tips, theme || 'light', userId]
        );
        res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating settings', error: error.message });
    }
};
