const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  console.log('Connected to MySQL.');

  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  // Basic tables/db
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('INSERT'));

  for (const statement of statements) {
    try {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      await connection.query(statement);
    } catch (err) {
      console.log(`Skipped or Error: ${err.message}`);
    }
  }

  // Explicit Column Migrations
  try {
    console.log('Adding trigger_type to analysis_results if missing...');
    await connection.query(`ALTER TABLE analysis_results ADD COLUMN trigger_type VARCHAR(50) DEFAULT 'unknown' AFTER potential_allergens`);
  } catch (e) { console.log('trigger_type probably already exists.'); }

  try {
    console.log('Adding category to faqs if missing...');
    await connection.query(`ALTER TABLE faqs ADD COLUMN category VARCHAR(50) DEFAULT 'General' AFTER question`);
  } catch (e) { console.log('category probably already exists.'); }

  try {
    console.log('Updating symptoms severity ENUM...');
    await connection.query(`ALTER TABLE symptoms MODIFY COLUMN severity ENUM('low', 'medium', 'moderate', 'high', 'severe') DEFAULT 'low'`);
  } catch (e) { console.log('Severity ENUM update failed or already done.'); }

  console.log('Migration complete.');
  await connection.end();
}

migrate().catch(console.error);
