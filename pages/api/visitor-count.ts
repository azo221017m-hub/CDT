import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/db';

type ResponseData = {
  success: boolean;
  count?: number;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Método no permitido' 
    });
  }

  let connection;
  try {
    connection = await connectToDatabase();
    
    // Create table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS visitor_stats (
        id INT PRIMARY KEY AUTO_INCREMENT,
        visit_count INT NOT NULL DEFAULT 0,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Initialize if no record exists
    await connection.execute(`
      INSERT INTO visitor_stats (id, visit_count) 
      SELECT 1, 1
      WHERE NOT EXISTS (SELECT 1 FROM visitor_stats WHERE id = 1)
    `);
    
    // Increment visit count
    await connection.execute(`
      UPDATE visitor_stats SET visit_count = visit_count + 1 WHERE id = 1
    `);
    
    // Get current count
    const [rows]: any = await connection.execute(`
      SELECT visit_count FROM visitor_stats WHERE id = 1
    `);
    
    const count = rows[0]?.visit_count || 0;
    
    res.status(200).json({ success: true, count });
  } catch (error: any) {
    console.error('Error accessing visitor count:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
