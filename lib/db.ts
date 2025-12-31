import mysql from 'mysql2/promise';

export async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || '3306'),
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    return connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

export async function testConnection() {
  let connection;
  try {
    connection = await connectToDatabase();
    await connection.ping();
    return { success: true, message: 'Conexión exitosa a la base de datos MySQL' };
  } catch (error: any) {
    return { 
      success: false, 
      message: 'Error al conectar a la base de datos',
      error: error.message 
    };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
