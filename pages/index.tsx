import { useState } from 'react';
import Head from 'next/head';
import ParticleBackground from '../components/ParticleBackground';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import BusinessCarousel from '../components/BusinessCarousel';
import Benefits from '../components/Benefits';
import Footer from '../components/Footer';
import RegistrationModal from '../components/RegistrationModal';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Comunidad Digital Texcoco - El pulso digital de Texcoco</title>
        <meta name="description" content="Comunidad digital donde emprendedores, creativos y ciudadanos de Texcoco conectan, comparten ideas y desarrollan oportunidades para crecer juntos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ParticleBackground />
      <CustomCursor />

      <div className={styles.page}>
        <Header onRegisterClick={handleRegisterClick} />
        
        <main className={styles.main}>
          <BusinessCarousel />
          <Benefits />
        </main>

        <Footer />
      </div>

      <RegistrationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
