import type { NextApiRequest, NextApiResponse } from 'next';
import { testConnection } from '../../lib/db';

type ResponseData = {
  success: boolean;
  message: string;
  error?: string;
  timestamp?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Método no permitido' 
    });
  }

  try {
    const result = await testConnection();
    res.status(result.success ? 200 : 500).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
