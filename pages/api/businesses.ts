import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/db';

type Business = {
  id: number;
  name: string;
  description: string;
  category: string;
  contact: string;
  image_url?: string;
  created_at: string;
}

type ResponseData = {
  success: boolean;
  businesses?: Business[];
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
      CREATE TABLE IF NOT EXISTS businesses (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        contact VARCHAR(255),
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Insert sample data if table is empty
    const [countRows]: any = await connection.execute(`
      SELECT COUNT(*) as count FROM businesses
    `);
    
    if (countRows[0].count === 0) {
      await connection.execute(`
        INSERT INTO businesses (name, description, category, contact) VALUES
        ('Café Texcoco', 'Café artesanal con productos locales y ambiente acogedor', 'Alimentos', 'cafe@texcoco.com'),
        ('Taller Mecánico López', 'Servicio de mecánica automotriz con más de 20 años de experiencia', 'Mantenimiento', 'taller@lopez.com'),
        ('Imprenta Digital', 'Servicios de impresión digital, diseño gráfico y publicidad', 'Impresión', 'contacto@imprentadigital.com'),
        ('Transporte Rápido', 'Servicio de transporte de mercancías local y foráneo', 'Transporte', 'info@transporterapido.com')
      `);
    }
    
    // Get all businesses
    const [rows]: any = await connection.execute(`
      SELECT * FROM businesses ORDER BY created_at DESC
    `);
    
    res.status(200).json({ success: true, businesses: rows });
  } catch (error: any) {
    console.error('Error accessing businesses:', error);
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
