const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authController = require('./controllers/authController');
const symptomController = require('./controllers/symptomController');
const { verifyToken, isAdmin } = require('./middleware/auth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Auth Routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.put('/api/profile', verifyToken, authController.updateProfile);
app.get('/api/settings', verifyToken, authController.getSettings);
app.put('/api/settings', verifyToken, authController.updateSettings);

// Symptom Routes (Protected)
app.post('/api/symptoms', verifyToken, symptomController.logSymptom);
app.get('/api/symptoms/history', verifyToken, symptomController.getHistory);
app.delete('/api/symptoms/:id', verifyToken, symptomController.deleteSymptom);

// Public Routes
app.get('/api/faqs', symptomController.getFaqs);

// Error Handling Middleware (Criteria 10)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
