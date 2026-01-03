import { useState, useEffect } from 'react';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  onRegisterClick: () => void;
}

export default function Header({ onRegisterClick }: HeaderProps) {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitor-count');
        const data = await response.json();
        if (data.success) {
          setVisitorCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching visitor count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <div className={styles.logoCircle}>CDT</div>
          </div>
          <div className={styles.projectInfo}>
            <h2 className={styles.projectName}>Comunidad Digital Texcoco</h2>
            <p className={styles.version}>Ver 26.01</p>
          </div>
        </div>

        <div className={styles.center}>
          <h1 className={styles.title}>El pulso digital de Texcoco.</h1>
          <p className={styles.description}>
            Somos una solución digital en Texcoco donde emprendedores, creativos y ciudadanos
            conectan, comparten ideas y desarrollan oportunidades para crecer juntos...
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.stats}>
            <div className={styles.visitorCount}>
              <span className={styles.visitorLabel}>Visitas</span>
              <span className={styles.visitorNumber}>
                {loading ? '...' : visitorCount.toLocaleString()}
              </span>
            </div>
          </div>
          <button className={styles.registerButton} onClick={onRegisterClick}>
            📋 Registrar mi Negocio
          </button>
        </div>
      </div>
    </header>
  );
}
