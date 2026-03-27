CREATE DATABASE IF NOT EXISTS allergycare_db;
USE allergycare_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Symptoms table
CREATE TABLE IF NOT EXISTS symptoms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    description TEXT NOT NULL,
    severity ENUM('low', 'medium', 'moderate', 'high', 'severe') DEFAULT 'low',
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Analysis/History table
CREATE TABLE IF NOT EXISTS analysis_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    symptom_id INT,
    potential_allergens TEXT,
    trigger_type VARCHAR(50) DEFAULT 'unknown',
    recommendations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (symptom_id) REFERENCES symptoms(id) ON DELETE CASCADE
);

-- User Settings table
CREATE TABLE IF NOT EXISTS user_settings (
    user_id INT PRIMARY KEY,
    pollen_alerts BOOLEAN DEFAULT TRUE,
    daily_tips BOOLEAN DEFAULT TRUE,
    theme ENUM('light', 'dark') DEFAULT 'light',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- FAQ/Support table
CREATE TABLE IF NOT EXISTS faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    category VARCHAR(50) DEFAULT 'General',
    answer TEXT NOT NULL
);

-- Insert demo FAQs
INSERT INTO faqs (question, answer) VALUES 
('What is AllergyCare?', 'AllergyCare is an AI-powered symptom tracker that helps identify potential allergy triggers.'),
('How do I log symptoms?', 'Navigate to the "Log Symptom" page and describe what you are feeling.'),
('Is my data secure?', 'Yes, we use industry-standard encryption and security practices to protect your data.');
