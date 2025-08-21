import { pool } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

async function testDatabaseConnection() {
  try {
    console.log('🔌 Testing database connection...');
    console.log('📊 Environment variables:');
    console.log('   MYSQL_URL:', process.env.MYSQL_URL ? 'Set' : 'Not set');
    console.log('   DB_HOST:', process.env.DB_HOST || 'Not set');
    console.log('   DB_USER:', process.env.DB_USER || 'Not set');
    console.log('   DB_NAME:', process.env.DB_NAME || 'Not set');
    console.log('   DB_PORT:', process.env.DB_PORT || 'Not set');
    
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    
    // Test query
    const [rows] = await connection.query('SHOW TABLES');
    console.log('📋 Available tables:');
    rows.forEach(row => {
      console.log(`   - ${Object.values(row)[0]}`);
    });
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('🔍 Error details:', error);
    process.exit(1);
  }
}

testDatabaseConnection();
