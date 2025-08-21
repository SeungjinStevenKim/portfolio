import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306,
  multipleStatements: true
};

async function initializeDatabase() {
  let connection;
  
  try {
    console.log('🔌 Connecting to MySQL...');
    connection = await mysql.createConnection(dbConfig);
    
    console.log('📖 Reading schema file...');
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('🚀 Executing schema...');
    await connection.query(schema);
    
    console.log('✅ Database initialized successfully!');
    console.log('📊 Tables created:');
    console.log('   - experience');
    console.log('   - experience_positions');
    console.log('   - experience_bullets');
    console.log('   - projects');
    console.log('');
    console.log('📝 Sample data inserted');
    console.log('🔑 Next steps:');
    console.log('   1. Update .env file with your database credentials');
    console.log('   2. Update .env file with your ADMIN_API_KEY');
    console.log('   3. Start the server with: npm run dev');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initializeDatabase();
