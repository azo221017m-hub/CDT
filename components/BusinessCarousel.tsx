import { useState, useEffect } from 'react';
import styles from '../styles/BusinessCarousel.module.css';

interface Business {
  id: number;
  name: string;
  description: string;
  category: string;
  contact: string;
  image_url?: string;
}

export default function BusinessCarousel() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('/api/businesses');
        const data = await response.json();
        if (data.success && data.businesses) {
          setBusinesses(data.businesses);
        }
      } catch (error) {
        console.error('Error fetching businesses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  useEffect(() => {
    if (businesses.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % businesses.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [businesses.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % businesses.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + businesses.length) % businesses.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Negocios Destacados</h2>
          <div className={styles.loading}>Cargando negocios...</div>
        </div>
      </section>
    );
  }

  if (businesses.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Negocios Destacados</h2>
          <div className={styles.empty}>No hay negocios registrados aún.</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Negocios Destacados</h2>
        
        <div className={styles.carouselContainer}>
          <button className={styles.navButton} onClick={prevSlide} aria-label="Anterior">
            ‹
          </button>

          <div className={styles.carousel}>
            <div 
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {businesses.map((business) => (
                <div key={business.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                      {business.name.charAt(0)}
                    </div>
                    <div className={styles.cardCategory}>{business.category}</div>
                  </div>
                  <h3 className={styles.cardTitle}>{business.name}</h3>
                  <p className={styles.cardDescription}>{business.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardContact}>📧 {business.contact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className={styles.navButton} onClick={nextSlide} aria-label="Siguiente">
            ›
          </button>
        </div>

        <div className={styles.dots}>
          {businesses.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a negocio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
