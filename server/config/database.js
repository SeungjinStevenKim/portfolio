import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Railway MySQL URL connection (preferred method)
const mysqlUrl = process.env.MYSQL_URL;

// Fallback to individual connection parameters
const dbConfig = mysqlUrl ? {
  uri: mysqlUrl,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
} : {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Test database connection with retry logic
const testConnection = async (retries = 5, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await pool.getConnection();
      console.log('✅ Database connected successfully');
      connection.release();
      return true;
    } catch (error) {
      console.error(`❌ Database connection attempt ${i + 1} failed:`, error.message);
      if (i < retries - 1) {
        console.log(`🔄 Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  console.error('❌ Database connection failed after all retries');
  return false;
};

export { pool, testConnection };
