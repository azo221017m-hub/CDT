import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

type ConnectionStatus = {
  success: boolean;
  message: string;
  error?: string;
  timestamp?: string;
  loading?: boolean;
}

export default function Home() {
  const [status, setStatus] = useState<ConnectionStatus>({ 
    success: false, 
    message: '', 
    loading: true 
  });

  const testConnection = async () => {
    setStatus({ success: false, message: '', loading: true });
    try {
      const response = await fetch('/api/test-connection');
      const data = await response.json();
      setStatus({ ...data, loading: false });
    } catch (error: any) {
      setStatus({ 
        success: false, 
        message: 'Error al probar la conexión', 
        error: error.message,
        loading: false 
      });
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <>
      <Head>
        <title>CDT - Conexión MySQL</title>
        <meta name="description" content="Página de prueba de conexión a MySQL" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>CDT - Sistema de Base de Datos</h1>
          
          <div className={styles.card}>
            <h2>Estado de Conexión MySQL</h2>
            
            {status.loading ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Probando conexión...</p>
              </div>
            ) : (
              <div className={status.success ? styles.success : styles.error}>
                <div className={styles.statusIcon}>
                  {status.success ? '✓' : '✗'}
                </div>
                <p className={styles.message}>{status.message}</p>
                {status.error && (
                  <p className={styles.errorDetail}>Error: {status.error}</p>
                )}
                {status.timestamp && (
                  <p className={styles.timestamp}>
                    Última prueba: {new Date(status.timestamp).toLocaleString('es-MX')}
                  </p>
                )}
              </div>
            )}

            <button 
              className={styles.button} 
              onClick={testConnection}
              disabled={status.loading}
            >
              {status.loading ? 'Probando...' : 'Probar Conexión'}
            </button>
          </div>

          <div className={styles.info}>
            <h3>Información de Configuración</h3>
            <ul>
              <li><strong>Host:</strong> Configurado vía variables de entorno</li>
              <li><strong>Base de Datos:</strong> Configurado vía variables de entorno</li>
              <li><strong>Puerto:</strong> 3306</li>
              <li><strong>SSL:</strong> Habilitado</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
