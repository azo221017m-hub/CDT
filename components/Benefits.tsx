import styles from '../styles/Benefits.module.css';

export default function Benefits() {
  const benefits = [
    {
      icon: '📢',
      title: 'Más visibilidad',
      description: 'Muestra lo bonito de tu negocio en nuestra comunidad digital y llega a más clientes.'
    },
    {
      icon: '🤝',
      title: 'Conexión local',
      description: 'Haz alianzas con otros emprendedores de Texcoco. (Mantenimiento, Publicidad, Impresores, Transporte, etc.)'
    },
    {
      icon: '💻',
      title: 'Digitalización Fácil',
      description: 'Sin costo, sin complicaciones, con solo un registro.'
    },
    {
      icon: '🚀',
      title: 'Crecimiento real',
      description: 'Más clientes, más oportunidades, más futuro.'
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>¿Por qué unirte?</h2>
        
        <div className={styles.grid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconContainer}>
                <span className={styles.icon}>{benefit.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
